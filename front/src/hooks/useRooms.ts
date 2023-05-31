"use client";

import { useEffect, useState } from "react";
import { useSession } from "./useSession";
import { useRouter } from "next/navigation";
import { RequestRoomsAdapter } from "@/services/rooms-service/request-rooms-adapter";
import { IRoom } from "@/model/rooms";

const useRooms = () => {
  const { token, tokenLoaded } = useSession();
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (tokenLoaded)
      (async () => {
        try {
          const rooms = await new RequestRoomsAdapter(token).request();
          setRooms(rooms);
        } catch {
          router.push("/login");
        }
      })();
  }, [tokenLoaded]);

  return rooms;
};

export { useRooms };
