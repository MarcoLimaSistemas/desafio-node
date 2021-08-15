'use strict'


class ImageController {


    async updateImg({ request, response, auth }) {
        const user = await auth.getUser();
    
        const validationOptions = {
          types: ["jpeg", "jpg", "png"],
          size: "2mb",
        };
        if (user.img_profile) {
          const oldKey = user.img_profile.split("/");
    
          await Drive.delete(
            oldKey[oldKey.length - 2] + "/" + oldKey[oldKey.length - 1]
          );
        }
    
        request.multipart.file("profile", validationOptions, async (file) => {
          // set file size from stream byteCount, so adonis can validate file size
          file.size = file.stream.byteCount;
    
          // catches validation errors, if any and then throw exception
          const error = file.error();
          if (error.message) {
            throw new Error(error.message);
          }
          const Key = `profile/${file.clientName}`;
          const ContentType = file.headers["content-type"];
          const ACL = "public-read";
          // upload file to s3
          const path = await Drive.put(Key, file.stream, {
            ContentType,
            ACL,
          });
    
          user.img_profile = path;
          await user.save();
        });
        await request.multipart.process();
        return response.status(200).send({
          message: "Foto de perfil atualizada com sucesso",
          data: user,
        });
      }

}

module.exports = ImageController