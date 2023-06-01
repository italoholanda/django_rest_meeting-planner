"use client";

import { useEffect, useState } from "react";
import { useSession } from "./useSession";
import { RequestMeetingsAdapter } from "@/services/meetings-service/request-meetings-adapter";
import { IMeeting } from "@/model/meetings";
import { handleServerErrors } from "@/util/handleServerErrors";

const useMeetings = () => {
  const { token, tokenLoaded } = useSession();
  const [meetings, setMeetings] = useState<IMeeting[]>();

  useEffect(() => {
    if (tokenLoaded)
      (async () => {
        try {
          const meetings = await new RequestMeetingsAdapter(token).request();
          setMeetings(meetings);
        } catch (err) {
          handleServerErrors(err);
        }
      })();
  }, [tokenLoaded]);

  return meetings;
};

export { useMeetings };
