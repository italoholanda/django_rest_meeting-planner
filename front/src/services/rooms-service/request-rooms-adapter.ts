import { IRoom } from "@/model/rooms";
import axios from "axios";

class RequestRoomsAdapter {
  private SERVER_URL = `${process.env.NEXT_PUBLIC_BACKEND}/rooms/`;

  constructor(private token: string) {}

  public async request(): Promise<IRoom[]> {
    const headers = { Authorization: `Bearer ${this.token}` };
    const response = await axios.get(this.SERVER_URL, { headers });
    const rawData = response.data;
    return rawData.map((room: any) => ({
      id: room.id,
      name: room.name,
      floor: room.floor,
      number: room.number,
    }));
  }
}

export { RequestRoomsAdapter };
