import axios from "axios";

export interface IMeeting {
  name: string;
  date: string;
  hour: string;
  roomId: string;
  duration: string;
  id: string;
}

class CreateMeetingAdapter {
  private SERVER_URL = `${process.env.NEXT_PUBLIC_BACKEND}/meetings/create/`;

  constructor(private token: string) {}

  public async register(meeting: IMeeting) {
    const body = {
      title: meeting.name,
      duration: Number(meeting.duration),
      date: meeting.date,
      start_time: meeting.hour + ":00",
      room: Number(meeting.roomId),
    };
    const headers = { Authorization: `Bearer ${this.token}` };
    await axios.post(this.SERVER_URL, body, { headers });
  }
}

export { CreateMeetingAdapter };
