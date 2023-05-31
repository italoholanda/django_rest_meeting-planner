import { ReactNode } from "react";
import Header from "../Header";

import "./styles.css"

interface IProps {
  children: ReactNode;
}

const BasePage = (props: IProps) => (
  <>
    <Header />
    <main className="content">{props.children}</main>
  </>
);

export default BasePage;
