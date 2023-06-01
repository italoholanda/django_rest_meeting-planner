"use client";

import BasePage from "@/components/BasePage";
import ContentBox from "@/components/ContentBox";

import "./styles.css";
import { useParams } from "next/navigation";
import { useMeeting } from "@/hooks/useMeeting";

const Login = () => {
  const { id } = useParams();
  const meeting = useMeeting(id);

  if (meeting)
    return (
      <BasePage>
        <ContentBox>
          <div className="card-line">
            <span className="min-text">meeting:</span>
            <h1>{meeting.name}</h1>
          </div>

          <hr />

          <div className="card-line">
            <span className="min-text">Details:</span>
            <ul className="list">
              <li className="min-text">🚪 {meeting.roomId}</li>
              <li className="min-text">🗓️ {meeting.date}</li>
              <li className="min-text">🕒 {meeting.hour}</li>
              <li className="min-text">⌛ {meeting.duration} hour</li>
            </ul>
          </div>
        </ContentBox>
      </BasePage>
    );
};

export default Login;
