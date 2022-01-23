interface GlobalOptions {
  basePath?: string;
}

const globalOptions: GlobalOptions = {};

export const getGlobalOption = (key: keyof GlobalOptions) => globalOptions[key];
export const setGlobalOption = <Key extends keyof GlobalOptions, Option extends GlobalOptions[Key]>(
  key: Key,
  value: Option
) => (globalOptions[key] = value);
