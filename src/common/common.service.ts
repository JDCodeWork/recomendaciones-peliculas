import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@Injectable()
export class CommonService {
  private readonly loggerInstance = new Logger('Common');

  handleDBExceptions(error: any) {
    if (error.code == '23505') throw new BadRequestException(error.detail);

    console.log('error.code :>> ', error.code);
    console.log('error.detail :>> ', error.detail);

    this.loggerInstance.error(error);
    throw new InternalServerErrorException('Has been an unexpected error');
  }
}
