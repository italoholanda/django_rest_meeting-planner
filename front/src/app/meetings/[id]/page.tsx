"use client";

import ContentBox from "@/components/ContentBox";
import EditButton from "@/components/EditButton";
import DeleteMeetingButton from "@/components/DeleteMeetingButton";

import "./styles.css";

import { useParams } from "next/navigation";
import { useMeetingDetailsFacade } from "@/hooks/useMeetingDetailsFacade";
import MeetingPageNav from "@/components/MeetingPageNav";

const Login = () => {
  const { id } = useParams();
  const meeting = useMeetingDetailsFacade(id);

  if (meeting)
    return (
      <>
        <ContentBox>
          <MeetingPageNav />
        </ContentBox>
        
        <ContentBox>
          <div className="card-line card-header">
            <div>
              <span className="min-text">meeting:</span>
              <h1>{meeting.name}</h1>
            </div>
            <div className="card-header-btns">
              <EditButton editUrl={`/meetings/edit/${id}`} />
              <DeleteMeetingButton id={id} />
            </div>
          </div>

          <hr />

          <div className="card-line">
            <span className="min-text">Details:</span>
            <ul className="list">
              <li className="min-text">🚪 {meeting.room?.name}</li>
              <li className="min-text">🗓️ {meeting.date}</li>
              <li className="min-text">🕒 {meeting.hour}</li>
              <li className="min-text">⌛ {meeting.duration} hour</li>
            </ul>
          </div>
        </ContentBox>
      </>
    );
};

export default Login;
