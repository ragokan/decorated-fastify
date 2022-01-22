import { FastifyReply, FastifyRequest, RequestGenericInterface } from "fastify";

export function route<T extends RequestGenericInterface>(
  fn: (req: FastifyRequest<T>, res: FastifyReply) => void
): (req: FastifyRequest<T>, res: FastifyReply) => void {
  return fn;
}
