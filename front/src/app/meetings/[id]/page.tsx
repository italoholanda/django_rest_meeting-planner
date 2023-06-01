"use client";

import ContentBox from "@/components/ContentBox";

import "./styles.css";

import { useParams } from "next/navigation";
import { useMeetingDetailsFacade } from "@/hooks/useMeetingDetailsFacade";

const Login = () => {
  const { id } = useParams();
  const meeting = useMeetingDetailsFacade(id);

  if (meeting)
    return (
      <ContentBox>
        <div className="card-line">
          <span className="min-text">meeting:</span>
          <h1>{meeting.name}</h1>
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
    );
};

export default Login;
