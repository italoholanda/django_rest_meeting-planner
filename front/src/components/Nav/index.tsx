import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import "./styles.css"

interface IProps {
  links: {
    content: ReactNode | string;
    url: string;
  }[];
}

const Nav = ({ links }: IProps) => {
  const router = useRouter();

  const onClick = (url: string) => router.push(url);

  return (
    <nav>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <button className="nav-btn" onClick={() => onClick(link.url)}>{link.content}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
