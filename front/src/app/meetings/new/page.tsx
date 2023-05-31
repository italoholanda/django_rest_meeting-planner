"use client";

import BasePage from "@/components/BasePage";
import ContentBox from "@/components/ContentBox";
import axios from "axios";

import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { useState } from "react";

import "./styles.css";
import { RoomsSelect } from "@/components/RoomsSelect";

interface IFormData {
  name?: string;
  date?: string;
  hour?: string;
  roomId?: string;
  duration?: string;
  id?: string;
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

    try {
      setFormState("LOADING");
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
    <BasePage>
      <ContentBox>
        <strong>New meeting</strong>
        <hr />
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Meeting name</label>
          <input id="name" />

          <label htmlFor="date">Date</label>
          <input id="date" type="date" />

          <label htmlFor="hours">Start hours</label>
          <input id="hours" type="time" />

          <label htmlFor="duration">Duration (h)</label>
          <input id="duration" type="number" min={1} max={4} />

          <label htmlFor="room">Room</label>
          <RoomsSelect />
          <button disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </ContentBox>
    </BasePage>
  );
};

export default Login;
