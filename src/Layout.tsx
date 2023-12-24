import {FC , PropsWithChildren} from "react";

export type LayoutProps =  PropsWithChildren & {}

export const Layout:FC<LayoutProps> = ({children})=>{
    return <>{children}</>
}