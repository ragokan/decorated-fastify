import { routeMetahandler } from "./utils";

export const Get = (url: string = ""): PropertyDecorator => routeMetahandler("GET", url);
export const Post = (url: string = ""): PropertyDecorator => routeMetahandler("POST", url);
export const Patch = (url: string = ""): PropertyDecorator => routeMetahandler("PATCH", url);
export const Put = (url: string = ""): PropertyDecorator => routeMetahandler("PUT", url);
export const Delete = (url: string = ""): PropertyDecorator => routeMetahandler("DELETE", url);
