"use client";

import { useEffect, useState } from "react";
import { useSession } from "./useSession";
import { RequestMeetingsAdapter } from "@/services/meetings-service/request-meetings-adapter";
import { IMeeting } from "@/model/meetings";
import { useRouter } from "next/navigation";

const useMeetings = () => {
  const { token, tokenLoaded } = useSession();
  const [meetings, setMeetings] = useState<IMeeting[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (tokenLoaded)
      (async () => {
        try {
          const meetings = await new RequestMeetingsAdapter(token).request();
          setMeetings(meetings);
        } catch {
          router.push("/login");
        }
      })();
  }, [tokenLoaded]);

  return meetings;
};

export { useMeetings };
