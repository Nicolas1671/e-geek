import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';
@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) return reject(new Error(error.message));
          resolve(result as UploadApiResponse);
        },
      );
      const readableStream = new Readable();
      readableStream.push(file.buffer);
      readableStream.push(null); // Indica el fin del stream

      readableStream.pipe(uploadStream);
    });
  }
}
