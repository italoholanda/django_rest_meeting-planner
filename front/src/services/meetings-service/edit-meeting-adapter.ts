import { IMeeting } from "@/model/meetings";
import axios from "axios";

class EditMeetingAdapter {
  private SERVER_URL = `${process.env.NEXT_PUBLIC_BACKEND}/meetings/update/`;

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
    await axios.put(`${this.SERVER_URL}?id=${meeting.id}`, body, { headers });
  }
}

export { EditMeetingAdapter };
