import { createRouteDecorator } from "../utils";

export const Get = (url: string = "", ...propertyDecorators: PropertyDecorator[]): PropertyDecorator =>
  createRouteDecorator("GET", url, ...propertyDecorators);
export const Post = (url: string = "", ...propertyDecorators: PropertyDecorator[]): PropertyDecorator =>
  createRouteDecorator("POST", url, ...propertyDecorators);
export const Patch = (url: string = "", ...propertyDecorators: PropertyDecorator[]): PropertyDecorator =>
  createRouteDecorator("PATCH", url, ...propertyDecorators);
export const Put = (url: string = "", ...propertyDecorators: PropertyDecorator[]): PropertyDecorator =>
  createRouteDecorator("PUT", url, ...propertyDecorators);
export const Delete = (url: string = "", ...propertyDecorators: PropertyDecorator[]): PropertyDecorator =>
  createRouteDecorator("DELETE", url, ...propertyDecorators);
