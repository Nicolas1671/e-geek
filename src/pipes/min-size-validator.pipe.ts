import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class MinSizeValidationPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    const minSize = 50000; // 50 KB
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (value.size < minSize) {
      throw new BadRequestException(
        `File size should be at least ${minSize} bytes.`,
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value;
  }
}
