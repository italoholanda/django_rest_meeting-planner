"use client";

import ContentBox from "@/components/ContentBox";
import LoadingIcon from "@/components/LoadingIcon";

import "@/styles/homepage.css";

import { useRouter } from "next/navigation";
import { useMeetings } from "@/hooks/useMeetings";

export default function Home() {
  const router = useRouter();
  const meetings = useMeetings();

  return (
    <ContentBox>
      <span>
        Welcome to the <br />
        <h1>👾 meeting planner</h1>
      </span>
      <hr />
      <p>Meetings:</p>

      {Boolean(meetings) && (
        <ul className="meetings">
          <li>
            <button
              className="meeting new"
              onClick={() => router.push("/meetings/new")}
            >
              + add meeting
            </button>
          </li>

          {meetings?.map((meeting) => (
            <li key={meeting.id}>
              <button
                className="meeting"
                onClick={() => router.push("/meetings/" + meeting.id)}
              >
                <span>📅</span>
                <p>{meeting.name}</p>
                <p className="min-text">
                  {meeting.hour}, <br />
                  {meeting.date}
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}

      {!meetings && (
        <div className="centered">
          <LoadingIcon />
        </div>
      )}
    </ContentBox>
  );
}
