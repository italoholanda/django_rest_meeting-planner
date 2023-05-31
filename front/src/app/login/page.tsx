"use client";

import { useSession } from "@/hooks/useSession";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IFormData {
  username?: string;
  password?: string;
}

const Login = () => {
  const [data, setData] = useState<IFormData>({});
  const { setToken } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!data.password || !data.username) alert("Invalid");
    try {
      const request = await axios.post("/api/login", data);
      setToken(request.data.token);
      router.push("/");
    } catch {
      setToken("");
      alert("Failed to login");
      setData({});
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={data.username || ""}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
        <input
          type="password"
          value={data.password || ""}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button>Submit</button>
      </form>
    </>
  );
};

export default Login;
