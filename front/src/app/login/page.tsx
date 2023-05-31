"use client";

import BasePage from "@/components/BasePage";
import ContentBox from "@/components/ContentBox";
import axios from "axios";

import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { useState } from "react";

import "./styles.css";

interface IFormData {
  username?: string;
  password?: string;
}

type FormState = "LOADING" | "READY" | "FAILED";

const Login = () => {
  const [data, setData] = useState<IFormData>({});
  const [formState, setFormState] = useState<FormState>("READY");

  const { setToken } = useSession();

  const router = useRouter();

  const isLoading = formState === "LOADING";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!data.password || !data.username) alert("Invalid");
    try {
      setFormState("LOADING");
      const request = await axios.post("/api/login", data);
      setToken(request.data.token);
      router.push("/");
    } catch {
      setToken("");
      alert("Failed to login");
      setData({});
      setFormState("FAILED")
    }
  };

  return (
    <BasePage>
      <ContentBox>
        <strong>Login</strong>
        <hr />
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={data.username || ""}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            disabled={isLoading}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={data.password || ""}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            disabled={isLoading}
          />
          <button disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </ContentBox>
    </BasePage>
  );
};

export default Login;
