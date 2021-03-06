import type { HTTPMethods } from "fastify";
import type { IMeta, ITarget } from "./types";

export const getMeta = (target: any): IMeta => {
  target.__decorator_meta__ ??= {
    url: "",
    routes: {},
  } as IMeta;
  return target.__decorator_meta__;
};

export const createRouteDecorator =
  <T>(
    method: HTTPMethods,
    path: string,
    ...propertyDecorators: PropertyDecorator[]
  ): PropertyDecorator =>
  (target, functionKey) => {
    const meta = getMeta(target as ITarget<T>);
    meta.routes[functionKey] ??= {
      method: method as any,
      url: path,
      functionKey,
      preHandlers: [],
    };
    propertyDecorators.forEach((decorator) => decorator(target, functionKey));
  };
