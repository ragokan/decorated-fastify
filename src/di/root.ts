import "reflect-metadata";
import type { ITarget } from "../server/types";

export class FastDI {
  private static _services: { [key: string]: any } = {};

  static resolve<T>(target: ITarget<T>): T {
    const services: ITarget<any>[] = Reflect.getMetadata("design:paramtypes", target) || [];
    const injections = services.map(FastDI.service);
    return new target(...injections);
  }

  static service<T>(target: ITarget<T>): T {
    return (FastDI._services[target.name] ??= FastDI.resolve<T>(target));
  }
}
