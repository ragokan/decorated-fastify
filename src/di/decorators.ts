import { ITarget } from "../server/types";

export type GenericClassDecorator<T> = (target: T) => void;

export const Service = (): GenericClassDecorator<ITarget<object>> => {
  return () => {
    // currently doing nothing, but we might do in future
  };
};
