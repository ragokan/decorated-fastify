import {
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
  preHandlerHookHandler,
  RequestGenericInterface,
} from "fastify";
import { GenericClassDecorator } from "..";
import { IHookHandler, ITarget } from "./types";
import { getMeta } from "./utils";

export const CreateControllerHandlerDecorator =
  <T, G extends RequestGenericInterface = RequestGenericInterface>(handler: IHookHandler<T | undefined, G>) =>
  (payload?: T): GenericClassDecorator<ITarget<object>> =>
  (target) => {
    const meta = getMeta(target.prototype);
    meta.globalHandler = ((a: FastifyRequest<G>, b: FastifyReply, c: HookHandlerDoneFunction) =>
      handler(a, b, c, payload)) as preHandlerHookHandler;
  };
