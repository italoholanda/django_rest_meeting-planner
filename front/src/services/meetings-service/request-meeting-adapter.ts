import { IMeeting } from "@/model/meetings";
import axios from "axios";

class RequestMeetingAdapter {
  private SERVER_URL = `${process.env.NEXT_PUBLIC_BACKEND}/meetings`;

  constructor(private token: string) {}

  public async request(id: string): Promise<IMeeting> {
    const headers = { Authorization: `Bearer ${this.token}` };
    const response = await axios.get(`${this.SERVER_URL}/${id}/`, { headers });
    const rawData = response.data;
    const list = rawData.map((meeting: any) => ({
      name: meeting.title,
      date: new Date(meeting.date).toLocaleDateString(),
      hour: meeting.start_time.substr(0, 5),
      duration: meeting.duration,
      roomId: meeting.room,
      id: meeting.id,
    }));
    return list[0];
  }
}

export { RequestMeetingAdapter };
