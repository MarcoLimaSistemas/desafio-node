"use strict";

const User = use("App/Models/User");
const resetedPassword = use("App/Models/ResetedPassword");
const Mail = use("Mail");
const moment = use("moment");
const Env = use("Env");
const Logger = use("Logger");
const Encryption = use("Encryption");
const Token = use("App/Models/Token");
const { validate } = use('Validator')
class AuthController {
  // Implementar endpoints de login e logout.
  async login({ request, response, auth }) {
    try {
      const { email, password } = request.only(["email", "password"]);

      const data = await auth.withRefreshToken().attempt(email, password);

      return response.ok({ data });
    } catch (error) {
      Logger.error(error.message);
      return response.unauthorized({ message: error.message });
    }
  }


  async logout({ request, response }) {
    const rules = {
      refresh_token: 'required'
    };

    const { refresh_token } = request.headers()

    const validation = await validate({ refresh_token }, rules);

    const decrypted = Encryption.decrypt(refresh_token);

    if (!validation.fails()) {
      try {
        const refreshToken = await Token.findBy('token', decrypted);
        if (refreshToken) {
          refreshToken.delete();
          response.status(200).send({ status: 'ok' });
        } else {
          response.status(401).send({ error: 'Invalid refresh token' });
        }
      } catch (err) {
        response.status(401).send({ error: err.toString()});
      }
    } else {
      response.status(401).send(validation.messages());
    }

  
  }

  // Implementar recuperação de senha por e-mail.

  async forgotPassword({ request, response }) {

    const { email } = request.post();
    const user = await User.findByOrFail("email", email);

    const resetedInfo = await resetedPassword.create({
      email,
      status: false,
    });

    const id = resetedInfo.id;
    const max = 6 - id.toString().length;
    let code = Math.random() * 1000000;
    code = code.toString();
    code = code.substr(0, max);
    code = `${id}${code}`;

    resetedInfo.code = code;

    await resetedInfo.save();

    await Mail.send("forgotpassword", { code }, message => {
      message
        .to(user.email)
        .from(Env.get("MAIL_USERNAME"))
        .subject("Código para redefinir sua senha");
    });

    return response.ok({ message: "Email enviado com sucesso. Valide seu código" });

  }

  async changePassword({ request, auth, response }) {
    const user = await auth.getUser();
    user.merge(request.only(["password"]));
    await user.save();
    return response.ok({
      message: "Senha alterada com sucesso",
    });
  }

  async validateCode({ request, response }) {
    const { code, email } = request.only(["code", "email"]);

    const requested = await resetedPassword
      .query()
      .where("code", code)
      .andWhere("email", email)
      .first();
    if (!requested)
      return response.notFound({ message: "Código e/ou email inválido" });

    const limitTime = moment(requested.created_at).add(10, "minutes");

    if (moment() > limitTime) {
      await request.delete();
      return response.unauthorized({ message: "Link expirado." });
    }

    if (requested.status === "0") {
      requested.status = 1;
      await requested.save();
    }

    return response.ok({
      message: "Código válido",
      data: requested,
    });
  }

  async resetPassword({ auth, request, response }) {
    const { password, id } = request.only(["password", "id"]);

    const requested = await resetedPassword.find(id);

    if (!requested)
      return response.notFound({ message: "Código e/ou email inválido" });

    if (requested.status === 1)
      return response.notFound({ message: "Código já utilizado" });

    const user = await User.query().where("email", requested.email).first();

    user.password = password;
    await user.save();

    const data = await auth.attempt(user.email, password);

    requested.status = 1;
    await requested.save();

    return response.ok({ message: "Senha foi redefinida", data, user });
  }
}

module.exports = AuthController;
