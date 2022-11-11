import { LanguageOutlined } from "@mui/icons-material";
import { AppBar, AppBarProps, Toolbar, Typography } from "@mui/material";
import DropDownMenu from "components/molecules/DropDownMenu";
import TooltipIconButton from "components/molecules/TooltipIconButton";
import dayjs from "dayjs";
import React from "react";
import { useTranslation } from "react-i18next";

const Languages = ["es", "en"];

const MainNavbar = (props: AppBarProps) => {
  const { t, i18n } = useTranslation();
  const checkIsActiveLanguage = (lan: string) => {
    return Boolean(i18n.language.includes(lan));
  };

  const onLanguageChange = (language: string) => {
    void i18n.changeLanguage(language);
    dayjs.locale(language);
  };
  return (
    <AppBar elevation={0} {...props}>
      <Toolbar sx={{ height: 64 }}>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{ alignSelf: "center", justifySelf: "flex-end", flexGrow: 1 }}
        >
          {t`appTitle`}
        </Typography>
        <DropDownMenu
          menuOptions={Languages}
          onItemClick={onLanguageChange}
          checkIsDisable={checkIsActiveLanguage}
          customOptionLabelParser={(option) =>
            t(`languageSettings.${option as string}`)
          }
        >
          {({ isOpen, onClick, id }) => (
            <TooltipIconButton
              title={t`languageSettings.instructions`}
              onClick={onClick}
              iconButtonProps={{
                id,
                "aria-controls": isOpen ? id : undefined,
                "aria-haspopup": "true",
                "aria-expanded": isOpen ? "true" : undefined,
              }}
              iconName={<LanguageOutlined />}
            />
          )}
        </DropDownMenu>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavbar;
