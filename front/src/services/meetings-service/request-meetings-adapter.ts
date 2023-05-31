import { IMeeting } from "@/model/meetings";
import axios from "axios";

class RequestMeetingsAdapter {
  private SERVER_URL = `${process.env.NEXT_PUBLIC_BACKEND}/meetings/`;

  constructor(private token: string) {}

  public async request(): Promise<IMeeting[]> {
    const headers = { Authorization: `Bearer ${this.token}` };
    const response = await axios.get(this.SERVER_URL, { headers });
    const rawData = response.data;
    return rawData.map((meeting: any) => ({
      name: meeting.title,
      date: new Date(meeting.date).toLocaleDateString(),
      hour: meeting.start_time.substr(0,5),
      duration: meeting.duration,
      id: meeting.id,
    }));
  }
}

export { RequestMeetingsAdapter };
