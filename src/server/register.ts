import { FastifyInstance } from "fastify";
import { FastDI } from "../di/root";
import { IController, IRegisterOptions } from "./types";

export function registerControllers(data: {
  instance: FastifyInstance;
  controllers?: Array<{ new (...args: any[]): any }>;
  options?: IRegisterOptions;
}) {
  const { controllers = [], instance, options = {} } = data;

  controllers.forEach(function (target) {
    const controller = FastDI.resolve<IController>(target);

    Object.values(controller.__decorator_meta__!.routes).forEach(function (val) {
      if (controller.__decorator_meta__!.globalHandler && !val.pure) {
        val.preHandlers.push(controller.__decorator_meta__!.globalHandler);
      }

      instance.route({
        method: val.method,
        url: (options.basePath ?? "") + controller.__decorator_meta__!.url + val.url,
        preHandler: val.preHandlers,
        handler: (controller as any)[val.functionKey],
        schema: val.schema,
        validatorCompiler: val.validatorCompiler,
      });
    });
  });
}
