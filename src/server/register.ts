import { FastifyInstance } from "fastify";
import { Provider } from "../di/provider";
import { IController } from "./types";

export function registerControllers(instance: FastifyInstance, controllers: Array<{ new (...args: any[]): any }> = []) {
  controllers.forEach(function (target) {
    const controller = Provider.create<IController>(target);

    Object.values(controller.__decorator_meta__!.routes).forEach(function (val) {
      controller.__decorator_meta__!.globalHandler &&
        val.preHandlers.push(controller.__decorator_meta__!.globalHandler);

      instance.route({
        method: val.method,
        url: controller.__decorator_meta__!.url + val.url,
        preHandler: val.preHandlers,
        handler: (controller as any)[val.functionKey],
      });
    });
  });
}
