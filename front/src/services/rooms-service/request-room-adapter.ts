import { IRoom } from "@/model/rooms";
import axios from "axios";

class RequestRoomAdapter {
  private SERVER_URL = `${process.env.NEXT_PUBLIC_BACKEND}/rooms`;

  constructor(private token: string) {}

  public async request(id: string): Promise<IRoom> {
    const headers = { Authorization: `Bearer ${this.token}` };
    const response = await axios.get(`${this.SERVER_URL}/${id}/`, { headers });
    const rawData = response.data;
    const list = rawData.map((room: any) => ({
      id: room.id,
      name: room.name,
      floor: room.floor,
      number: room.number,
    }));
    if (list.length > 0) return list[0];
    else throw new Error("Not found");
  }
}

export { RequestRoomAdapter };
