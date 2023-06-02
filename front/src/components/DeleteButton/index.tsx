import "./styles.css";
import { useState } from "react";

type Status = "DELETE" | "DELETING";

interface IProps {
  onDelete: () => any;
  status: Status;
}

const DeleteButton = (props: IProps) => {
  const onClick = () => {
    props.onDelete();
  };

  if (props.status === "DELETE")
    return (
      <button onClick={onClick} className="del-btn">
        🗑 Delete
      </button>
    );

  return (
    <button disabled className="del-btn">
      🗑 Deleting...
    </button>
  );
};

export default DeleteButton;
