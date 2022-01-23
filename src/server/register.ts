import { FastifyInstance } from "fastify";
import { getGlobalOption } from "..";
import { FastDI } from "../di/root";
import { IController } from "./types";

export function registerControllers(instance: FastifyInstance, controllers: Array<{ new (...args: any[]): any }> = []) {
  controllers.forEach(function (target) {
    const controller = FastDI.create<IController>(target);

    Object.values(controller.__decorator_meta__!.routes).forEach(function (val) {
      if (controller.__decorator_meta__!.globalHandler && !val.pure) {
        val.preHandlers.push(controller.__decorator_meta__!.globalHandler);
      }

      instance.route({
        method: val.method,
        url: (getGlobalOption("basePath") ?? "") + controller.__decorator_meta__!.url + val.url,
        preHandler: val.preHandlers,
        handler: (controller as any)[val.functionKey],
      });
    });
  });
}
