import { routeMetahandler } from "./utils";

export const Get = (url: string = "", propertyDecorators: PropertyDecorator[] | null = null): PropertyDecorator =>
  routeMetahandler("GET", url, propertyDecorators);
export const Post = (url: string = "", propertyDecorators: PropertyDecorator[] | null = null): PropertyDecorator =>
  routeMetahandler("POST", url, propertyDecorators);
export const Patch = (url: string = "", propertyDecorators: PropertyDecorator[] | null = null): PropertyDecorator =>
  routeMetahandler("PATCH", url, propertyDecorators);
export const Put = (url: string = "", propertyDecorators: PropertyDecorator[] | null = null): PropertyDecorator =>
  routeMetahandler("PUT", url, propertyDecorators);
export const Delete = (url: string = "", propertyDecorators: PropertyDecorator[] | null = null): PropertyDecorator =>
  routeMetahandler("DELETE", url, propertyDecorators);
