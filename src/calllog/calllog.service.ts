import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Call, Prisma } from '@prisma/client';

@Injectable()
export class CallLogService {
  constructor(private readonly prismaService: PrismaService) {}

  async calllog(id: number): Promise<Call | null> {
    return this.prismaService.call.findUnique({ where: { id: id } });
  }

  async calllogs(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CallWhereUniqueInput;
    where?: Prisma.CallWhereInput;
    orderBy?: Prisma.CallOrderByWithRelationInput;
  }): Promise<Call[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.call.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createCallLog(data: Prisma.CallCreateInput): Promise<Call> {
    return this.prismaService.call.create({
      data,
    });
  }
}
