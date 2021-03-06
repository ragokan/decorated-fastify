import type {
  FastifyReply,
  FastifyRequest,
  FastifySchema,
  FastifySchemaCompiler,
  HookHandlerDoneFunction,
  preHandlerHookHandler,
  RequestGenericInterface,
} from "fastify";

export interface IMeta {
  url: string;
  globalHandler?: preHandlerHookHandler;
  routes: {
    [key: PropertyKey]: {
      url: string;
      method: "GET" | "POST" | "PUT";
      functionKey: PropertyKey;
      preHandlers: preHandlerHookHandler[];
      pure?: boolean;
      schema?: FastifySchema;
      validatorCompiler?: FastifySchemaCompiler<FastifySchema>;
    };
  };
}

export interface IController {
  __decorator_meta__?: IMeta;
}

export type ITarget<T> = { new (...args: any[]): T };

export type IHookHandler<Payload, RequestBody extends RequestGenericInterface = {}> = (
  req: FastifyRequest<RequestBody>,
  res: FastifyReply,
  done: HookHandlerDoneFunction,
  payload: Payload
) => void;

export interface IRegisterOptions {
  basePath?: string;
}
