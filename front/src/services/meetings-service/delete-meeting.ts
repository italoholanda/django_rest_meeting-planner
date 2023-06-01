import axios from "axios";

class DeleteMeeting {
  private SERVER_URL = `${process.env.NEXT_PUBLIC_BACKEND}/meetings/delete`;

  constructor(private token: string) {}

  public async delete(id: string) {
    const headers = { Authorization: `Bearer ${this.token}` };
    await axios.delete(`${this.SERVER_URL}/?id=${id}`, { headers });
  }
}

export { DeleteMeeting };
