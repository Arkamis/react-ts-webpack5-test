import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { defaultNS, resources } from "./common";

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  // have a common namespace used around the full app
  ns: [defaultNS],
  defaultNS,
  debug: true,
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  resources,
});

export default i18n;
