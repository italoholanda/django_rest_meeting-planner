"use client";

import BasePage from "@/components/BasePage";
import ContentBox from "@/components/ContentBox";
import "@/styles/homepage.css";

import {
  IMeeting,
  RequestMeetingsAdapter,
} from "@/services/meetings-service/request-meetings-adapter";

import { useEffect, useState } from "react";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";

export default function Home() {
  const { token } = useSession();
  const router = useRouter();
  const [meetings, setMeetings] = useState<IMeeting[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const meetings = await new RequestMeetingsAdapter(token).request();
        setMeetings(meetings);
      } catch {
        router.push("/login");
      }
    })();
  }, []);

  return (
    <BasePage>
      <ContentBox>
        <span>
          Welcome to the <br />
          <h1>👾 meeting planner</h1>
        </span>
        <hr />
        <p>Meetings:</p>

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
      </ContentBox>
    </BasePage>
  );
}
