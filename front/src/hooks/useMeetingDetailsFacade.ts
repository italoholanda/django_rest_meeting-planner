"use client";

import { IMeetingDetails } from "@/model/meetings";
import { RequestMeetingAdapter } from "@/services/meetings-service/request-meeting-adapter";
import { useEffect, useState } from "react";
import { useSession } from "./useSession";
import { RequestRoomAdapter } from "@/services/rooms-service/request-room-adapter";

const useMeetingDetailsFacade = (id: string) => {
  const { token, tokenLoaded } = useSession();
  const [meetingDetails, setMeetingDetails] = useState<IMeetingDetails>();

  useEffect(() => {
    if (!tokenLoaded) return;

    (async () => {
      const meeting = await new RequestMeetingAdapter(token).request(id);
      if (!meeting.id) return;
      const room = await new RequestRoomAdapter(token).request(meeting.roomId);
      setMeetingDetails({
        ...meeting,
        room: {
          floor: room?.floor,
          name: room?.name,
        },
      });
    })();
  }, [tokenLoaded]);

  return meetingDetails;
};

export { useMeetingDetailsFacade };
