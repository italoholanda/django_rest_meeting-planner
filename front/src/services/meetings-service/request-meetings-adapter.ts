import axios from "axios";

export interface IMeeting {
  name: string;
  date: string;
  hour: string;
  roomId: string;
  duration: string;
  id: string
}

class RequestMeetingsAdapter {
  private SERVER_URL = `${process.env.NEXT_PUBLIC_BACKEND}/meetings/`;

  constructor(private token: string) {}

  public async request(): Promise<IMeeting[]> {
    const headers = { Authorization: `Bearer ${this.token}` };
    const response = await axios.get(this.SERVER_URL, { headers });
    const rawData = response.data;
    return rawData.map((meeting: any) => ({
      name: meeting.title,
      date: meeting.date,
      hour: meeting.start_time,
      duration: meeting.duration,
      id: meeting.id,
    }));
  }
}

export { RequestMeetingsAdapter };
