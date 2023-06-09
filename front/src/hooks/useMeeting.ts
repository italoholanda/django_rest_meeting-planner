"use client";

import { useEffect, useState } from "react";
import { useSession } from "./useSession";
import { RequestMeetingAdapter } from "@/services/meetings-service/request-meeting-adapter";
import { IMeeting } from "@/model/meetings";
import { handleServerErrors } from "@/util/handleServerErrors";

const useMeeting = (id: string) => {
  const { token, tokenLoaded } = useSession();
  const [meeting, setMeeting] = useState<IMeeting>();

  useEffect(() => {
    if (tokenLoaded)
      (async () => {
        try {
          const meeting = await new RequestMeetingAdapter(token).request(id);
          setMeeting(meeting);
        } catch (err) {
          handleServerErrors(err);
        }
      })();
  }, [tokenLoaded]);

  return meeting;
};

export { useMeeting };
