"use client";

import { useEffect, useState } from "react";
import { useSession } from "./useSession";
import { RequestRoomAdapter } from "@/services/rooms-service/request-room-adapter";
import { IRoom } from "@/model/rooms";
import { handleServerErrors } from "@/util/handleServerErrors";

const useRoom = (id: string) => {
  const { token, tokenLoaded } = useSession();
  const [room, setRoom] = useState<IRoom>();

  useEffect(() => {
    if (tokenLoaded)
      (async () => {
        try {
          const room = await new RequestRoomAdapter(token).request(id);
          setRoom(room);
        } catch (err) {
          handleServerErrors(err);
        }
      })();
  }, [tokenLoaded]);

  return room;
};

export { useRoom };
