import { DeleteMeeting } from "@/services/meetings-service/delete-meeting";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";

import DeleteButton from "../DeleteButton";

interface IProps {
  id: string;
}

const DeleteMeetingButton = (props: IProps) => {
  const { token } = useSession();
  const router = useRouter();

  const onDelete = async () => {
    new DeleteMeeting(token).delete(props.id);
    router.push("/");
  };

  return <DeleteButton onDelete={onDelete} />;
};

export default DeleteMeetingButton;
