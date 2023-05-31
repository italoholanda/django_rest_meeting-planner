import axios from "axios";

interface IRequestParams {
  user: string;
  pass: string;
}

export class AuthenticationServiceAdapter {
  private BACKEND_URL = `${process.env.NEXT_PUBLIC_BACKEND}/o/token/`;
  private CLIENT_ID = process.env.PRIVATE_CLIENT_ID;
  private CLIENT_SECRET = process.env.PRIVATE_CLIENT_SECRET;

  private encodeClientCredentials() {
    const bufferedStr = Buffer.from(this.CLIENT_ID + ":" + this.CLIENT_SECRET);
    return "Basic " + bufferedStr.toString("base64");
  }

  public async auth({ user, pass }: IRequestParams) {
    const body = `grant_type=password&username=${user}&password=${pass}`;
    const headers = {
      Authorization: this.encodeClientCredentials(),
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const response = await axios.post(this.BACKEND_URL, body, { headers });
    const token = response.data?.access_token;
    if (token) return token;
    throw new Error("Failed to retrieve user token");
  }
}
