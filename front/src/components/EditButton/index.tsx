import { useRouter } from "next/navigation";
import "./styles.css";

interface IProps {
  editUrl: string;
}

const EditButton = (props: IProps) => {
  const router = useRouter();

  const onClick = () => router.push(props.editUrl);

  return (
    <button onClick={onClick} className="edit-btn">
      📝 Edit
    </button>
  );
};

export default EditButton;
