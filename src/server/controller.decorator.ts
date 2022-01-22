import { GenericClassDecorator } from "../di/decorators";
import { ITarget } from "./types";
import { getMeta } from "./utils";

export const Controller =
  (url: string): GenericClassDecorator<ITarget<object>> =>
  (target) => {
    const meta = getMeta(target.prototype);
    meta.url = url;
  };
