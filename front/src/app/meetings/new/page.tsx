"use client";

import BasePage from "@/components/BasePage";
import ContentBox from "@/components/ContentBox";

import {
  CreateMeetingAdapter,
  IMeeting,
} from "@/services/meetings-service/create-meeting-adapter";

import { useSession } from "@/hooks/useSession";
import { RoomsSelect } from "@/components/RoomsSelect";
import { useRouter } from "next/navigation";
import { useState } from "react";

import "./styles.css";

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

  const { token } = useSession();

  const router = useRouter();

  const isLoading = formState === "LOADING";

  const isFormValid = () => {
    console.log(data);
    return Object.values(data).length === 5;
  };

  const onChangeData = (field: keyof typeof data, value: string) => {
    const newData = { ...data };
    newData[field] = value;
    setData(newData);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Invalid fields");
      return;
    }

    try {
      setFormState("LOADING");
      await new CreateMeetingAdapter(token).register(data as IMeeting);
      router.push("/");
      setFormState("READY");
    } catch {
      setData({});
      setFormState("FAILED");
    }
  };

  return (
    <BasePage>
      <ContentBox>
        <strong>New meeting</strong>
        <hr />
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Meeting name</label>
          <input
            id="name"
            value={data.name || ""}
            onChange={(e) => onChangeData("name", e.currentTarget.value)}
          />

          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={data.date || ""}
            onChange={(e) => onChangeData("date", e.currentTarget.value)}
          />

          <label htmlFor="hours">Start hours</label>
          <input
            id="hours"
            type="time"
            value={data.hour || ""}
            onChange={(e) => onChangeData("hour", e.currentTarget.value)}
          />

          <label htmlFor="duration">Duration (h)</label>
          <input
            id="duration"
            type="number"
            min={1}
            max={4}
            value={data.duration || ""}
            onChange={(e) => onChangeData("duration", e.currentTarget.value)}
          />

          <label htmlFor="room">Room</label>
          <RoomsSelect onChange={(id) => onChangeData("roomId", id)} />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </ContentBox>
    </BasePage>
  );
};

export default Login;
