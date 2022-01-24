import { getMeta } from "../utils";

export const Validate =
  (body: any): PropertyDecorator =>
  (target, functionKey) => {
    const meta = getMeta(target);
    meta.routes[functionKey].schema = { body };
    meta.routes[functionKey].validatorCompiler =
      ({ schema }) =>
      (data) =>
        (schema as any).validate(data);
  };
