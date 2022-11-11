import { render, RenderOptions } from "@testing-library/react";
import i18n from "i18n/test-config";
import * as React from "react";
import { I18nextProvider } from "react-i18next";
import { ThemeConfig } from "theme";

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeConfig>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </ThemeConfig>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

const renderWithin18next = (Component: any) => {
  // workaround to fix setting setup
  const Comp = React.cloneElement(Component, {
    changeLanguage: (lng: string) => {
      void i18n.changeLanguage(lng);
      rerender(<I18nextProvider i18n={i18n}>{Comp}</I18nextProvider>);
    },
  });
  const defaultRender = render(
    <I18nextProvider i18n={i18n}>{Comp}</I18nextProvider>
  );
  const { rerender } = defaultRender;
  return defaultRender;
};

export * from "@testing-library/react";
export { customRender, renderWithin18next };
