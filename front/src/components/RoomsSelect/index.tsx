"use client";

import {
  IRoom,
  RequestRoomsAdapter,
} from "@/services/rooms-service/request-rooms-adapter";

import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import { ChangeEvent, useEffect, useState } from "react";

interface IProps {
  onChange?: (arg: string) => any;
}

export const RoomsSelect = ({ onChange }: IProps) => {
  const { token } = useSession();
  const router = useRouter();
  const [rooms, setRooms] = useState<IRoom[]>([]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (onChange) onChange(value);
  };

  useEffect(() => {
    (async () => {
      try {
        const requestedRooms = await new RequestRoomsAdapter(token).request();
        setRooms(requestedRooms);
      } catch {
        router.push("/login");
      }
    })();
  }, []);

  return (
    <select  onChange={handleChange} defaultValue={0}>
      <option disabled value={0}>Select a room</option>
      {rooms.map((room) => (
        <option key={room.id} value={room.id}>
          {room.name}
        </option>
      ))}
    </select>
  );
};
