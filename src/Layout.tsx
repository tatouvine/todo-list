import React, { FC, PropsWithChildren } from "react";
import { Content } from "antd/es/layout/layout";
import { ChangeLanguage } from "./ChangeLanguage";

export type LayoutProps = PropsWithChildren & {};

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div
      style={{
        background: "white",
        minHeight: 280,
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          padding: "0 0 8px 0",
        }}
      >
        <ChangeLanguage />
      </div>
      {children}
    </div>
  );
};
