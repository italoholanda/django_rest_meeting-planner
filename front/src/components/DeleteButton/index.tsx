import "./styles.css";
import { useState } from "react";

interface IProps {
  onDelete: () => any;
}

type Status = "DELETE" | "DELETING";

const DeleteButton = (props: IProps) => {
  const [status, setStatus] = useState<Status>("DELETE");

  const onClick = () => {
    props.onDelete();
    setStatus("DELETING");
  };

  if (status === "DELETE")
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

export default DeleteButton
