'use strict'

const Drive = use('Drive')
const Image = use('App/Models/Image')

class ImageController {


    async uploadImg({ request, response }) {
        let images = []
        const validationOptions = {
          types: ["jpeg", "jpg", "png"],
          size: "2mb",
        };
       
    
        request.multipart.file("image", validationOptions, async (file) => {
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
          const image = await Image.create({
            name: Key,
            file_name: path
          })
          images.push(image)
          
        });
        await request.multipart.process();
        return response.status(200).send({
          message: "Upload de fotos realizadas com sucesso",
          data: images,
        });
      }

}

module.exports = ImageController