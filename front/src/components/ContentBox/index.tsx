import { ReactNode } from "react";
import "./styles.css"

interface IProps {
  children: ReactNode;
}

const ContentBox = (props: IProps) => (
  <div className="card">{props.children}</div>
);

export default ContentBox;
