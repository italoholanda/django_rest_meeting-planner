"use client";

import { useEffect, useState } from "react";
import { useSession } from "./useSession";
import { RequestRoomsAdapter } from "@/services/rooms-service/request-rooms-adapter";
import { IRoom } from "@/model/rooms";
import { handleServerErrors } from "@/util/handleServerErrors";

const useRooms = () => {
  const { token, tokenLoaded } = useSession();
  const [rooms, setRooms] = useState<IRoom[]>([]);

  useEffect(() => {
    if (tokenLoaded)
      (async () => {
        try {
          const rooms = await new RequestRoomsAdapter(token).request();
          setRooms(rooms);
        } catch (err) {
          handleServerErrors(err);
        }
      })();
  }, [tokenLoaded]);

  return rooms;
};

export { useRooms };
