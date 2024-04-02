import { Injectable } from '@nestjs/common';
import { CreateAccessEventDto } from './dto/create-access-event.dto';
import { UpdateAccessEventDto } from './dto/update-access-event.dto';

@Injectable()
export class AccessEventService {
  create(createAccessEventDto: CreateAccessEventDto) {
    return 'This action adds a new accessEvent';
  }

  findAll() {
    return `This action returns all accessEvent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accessEvent`;
  }

  update(id: number, updateAccessEventDto: UpdateAccessEventDto) {
    return `This action updates a #${id} accessEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} accessEvent`;
  }
}
