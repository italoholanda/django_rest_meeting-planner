"use client";

import { useEffect, useState } from "react";
import { useSession } from "./useSession";
import { useRouter } from "next/navigation";
import { RequestRoomAdapter } from "@/services/rooms-service/request-room-adapter";
import { IRoom } from "@/model/rooms";

const useRoom = (id: string) => {
  const { token, tokenLoaded } = useSession();
  const [room, setRoom] = useState<IRoom>();
  const router = useRouter();

  useEffect(() => {
    if (tokenLoaded)
      (async () => {
        try {
          const room = await new RequestRoomAdapter(token).request(id);
          setRoom(room);
        } catch {
          router.push("/login");
        }
      })();
  }, [tokenLoaded]);

  return room;
};

export { useRoom };
