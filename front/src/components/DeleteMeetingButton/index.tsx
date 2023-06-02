import { DeleteMeeting } from "@/services/meetings-service/delete-meeting";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { useState } from "react";

import dynamic from "next/dynamic";
import DeleteButton from "../DeleteButton";

const AreYouSureModal = dynamic(() => import("@/components/AreYouSureModal"));

interface IProps {
  id: string;
}

const DeleteMeetingButton = (props: IProps) => {
  const { token } = useSession();
  const router = useRouter();

  const [deleteModal, setDeleteModal] = useState(false);
  const [status, setStatus] = useState<"DELETE" | "DELETING">("DELETE");

  const onDelete = async () => {
    new DeleteMeeting(token).delete(props.id);
    setStatus("DELETING");
    router.push("/");
  };

  return (
    <>
      <DeleteButton status={status} onDelete={() => setDeleteModal(true)} />
      {deleteModal && (
        <AreYouSureModal
          onClose={() => setDeleteModal(false)}
          onConfirm={onDelete}
          text="Do you really want to delete this meeting?"
        />
      )}
    </>
  );
};

export default DeleteMeetingButton;
