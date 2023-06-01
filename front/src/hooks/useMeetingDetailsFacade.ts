"use client";

import { IMeetingDetails } from "@/model/meetings";
import { RequestMeetingAdapter } from "@/services/meetings-service/request-meeting-adapter";
import { useEffect, useState } from "react";
import { useSession } from "./useSession";
import { RequestRoomAdapter } from "@/services/rooms-service/request-room-adapter";
import { handleServerErrors } from "@/util/handleServerErrors";

const useMeetingDetailsFacade = (id: string) => {
  const { token, tokenLoaded } = useSession();
  const [meetingDetails, setMeetingDetails] = useState<IMeetingDetails>();

  useEffect(() => {
    if (!tokenLoaded) return;

    (async () => {
      try {
        const meeting = await new RequestMeetingAdapter(token).request(id);
        if (!meeting.id) return;
        const room = await new RequestRoomAdapter(token).request(
          meeting.roomId
        );
        setMeetingDetails({
          ...meeting,
          room: {
            floor: room?.floor,
            name: room?.name,
          },
        });
      } catch (err) {
        handleServerErrors(err);
      }
    })();
  }, [tokenLoaded]);

  return meetingDetails;
};

export { useMeetingDetailsFacade };
