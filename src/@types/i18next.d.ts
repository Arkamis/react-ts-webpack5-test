import { defaultNS, resources } from "../i18n/config";

declare module "i18next" {
  type CustomTypeOptions = {
    defaultNS: typeof defaultNS;
    resources: typeof resources["en"];
  };
}
