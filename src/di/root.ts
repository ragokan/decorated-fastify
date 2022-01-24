import "reflect-metadata";
import type { ITarget } from "../server/types";

export class FastDI {
  private static _services: { [key: string]: any } = {};

  static resolve<T>(target: ITarget<T>): T {
    const services: ITarget<any>[] = Reflect.getMetadata("design:paramtypes", target) || [];
    const injections = services.map((token) => (this._services[token?.name] ??= this.resolve<any>(token)));
    return new target(...injections);
  }
}
