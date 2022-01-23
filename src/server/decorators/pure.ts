import { getMeta } from "../utils";

export const Pure = (): PropertyDecorator => (target, functionKey) => {
  const meta = getMeta(target);
  meta.routes[functionKey].pure = true;
};
