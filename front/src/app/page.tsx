"use client";

import BasePage from "@/components/BasePage";
import ContentBox from "@/components/ContentBox";
import LoadingIcon from "@/components/LoadingIcon";

import "@/styles/homepage.css";

import { useRouter } from "next/navigation";
import { useMeetings } from "@/hooks/useMeetings";

export default function Home() {
  const router = useRouter();
  const meetings = useMeetings();

  return (
    <BasePage>
      <ContentBox>
        <span>
          Welcome to the <br />
          <h1>👾 meeting planner</h1>
        </span>
        <hr />
        <p>Meetings:</p>

        {Boolean(meetings.length) && (
          <ul className="meetings">
            <li>
              <button
                className="meeting new"
                onClick={() => router.push("/meetings/new")}
              >
                + add meeting
              </button>
            </li>

            {meetings.map((meeting) => (
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

        {!meetings.length && (
          <div className="centered">
            <LoadingIcon />
          </div>
        )}
      </ContentBox>
    </BasePage>
  );
}
