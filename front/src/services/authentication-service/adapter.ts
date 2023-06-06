import axios from "axios";

interface IRequestParams {
  user: string;
  pass: string;
}

export class AuthenticationServiceAdapter {
  private BACKEND_URL = `${process.env.NEXT_PUBLIC_BACKEND}/o/token/`;

  public async auth({ user, pass }: IRequestParams) {
    const body = `username=${user}&password=${pass}`;
    const response = await axios.post(this.BACKEND_URL, body);
    const token = response.data?.token;
    console.log(token);
    if (token) return token;
    throw new Error("Failed to retrieve user token");
  }
}
