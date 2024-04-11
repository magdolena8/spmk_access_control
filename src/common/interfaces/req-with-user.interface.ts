import { JwtPayload } from '../classes/jwt-payload.class';
import { FastifyRequest } from 'fastify';

export interface RequestWithJwtPayload extends FastifyRequest {
  device: JwtPayload;
}
