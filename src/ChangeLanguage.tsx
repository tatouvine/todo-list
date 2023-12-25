import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "antd";

export type ChangeLanguageProps = {};

export const ChangeLanguage: FC<ChangeLanguageProps> = ({}) => {
  const [t, i18n] = useTranslation("global");

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Select
      onChange={(value) => {
        handleChangeLanguage(value);
      }}
      defaultValue={"en"}
      options={[
        { label: t("translation.english"), value: "en" },
        { label: t("translation.french"), value: "fr" },
      ]}
    />
  );
};
