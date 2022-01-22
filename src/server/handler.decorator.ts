import {
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
  preHandlerHookHandler,
  RequestGenericInterface,
} from "fastify";
import { getMeta } from "./utils";
import { IHookHandler, ITarget } from "./types";

export const CreateHandlerDecorator =
  <T, G extends RequestGenericInterface = RequestGenericInterface>(handler: IHookHandler<T | undefined, G>) =>
  (payload?: T): PropertyDecorator =>
  (target, functionKey) => {
    const meta = getMeta(target as ITarget<typeof target>);
    meta.routes[functionKey].preHandlers.push(((a: FastifyRequest<G>, b: FastifyReply, c: HookHandlerDoneFunction) =>
      handler(a, b, c, payload)) as preHandlerHookHandler);
  };
