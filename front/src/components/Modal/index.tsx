import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import "./styles.css"

interface IProps {
  children: ReactNode;
  onClose: () => any;
}

const Modal = ({ onClose, children }: IProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePressESC = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: globalThis.MouseEvent) => {
      const node = e.target as Node;
      if (!containerRef.current?.contains(node)) onClose();
    };

    document.addEventListener("keydown", handlePressESC);
    document.addEventListener("mousedown", handleClickOutside);

    return (() => {
      document.removeEventListener("keydown", handlePressESC);
      document.removeEventListener("mousedown", handleClickOutside);
    })();
  }, []);

  return createPortal(
    <div className="modal-wrapper">
      <div id="modal" ref={containerRef}>
        {children}
      </div>
    </div>,
    document.getElementById("portals") as HTMLDivElement
  );
};

export default Modal;
