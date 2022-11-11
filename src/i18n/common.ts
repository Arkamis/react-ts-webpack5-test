import EnglishTranslation from "./en/translation.json";
import SpanishTranslation from "./es/translation.json";

export const defaultNS = "home";

export const resources = {
  en: {
    home: EnglishTranslation,
  },
  es: {
    home: SpanishTranslation,
  },
} as const;
