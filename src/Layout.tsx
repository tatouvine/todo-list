import React, { FC, PropsWithChildren } from "react";
import { Content } from "antd/es/layout/layout";

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
      {children}
    </div>
  );
};
