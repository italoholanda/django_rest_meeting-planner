"use client";

import { ChangeEvent } from "react";
import { useRooms } from "@/hooks/useRooms";

interface IProps {
  onChange?: (arg: string) => any;
}

export const RoomsSelect = ({ onChange }: IProps) => {
  const rooms = useRooms();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (onChange) onChange(value);
  };

  return (
    <select onChange={handleChange} defaultValue={0}>
      <option disabled value={0}>
        Select a room
      </option>
      {rooms.map((room) => (
        <option key={room.id} value={room.id}>
          {room.name}
        </option>
      ))}
    </select>
  );
};
