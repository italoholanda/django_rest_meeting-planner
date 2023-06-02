"use client";

import ContentBox from "@/components/ContentBox";
import LoadingIcon from "@/components/LoadingIcon";

import { useSession } from "@/hooks/useSession";
import { RoomsSelect } from "@/components/RoomsSelect";
import { EditMeetingAdapter } from "@/services/meetings-service/edit-meeting-adapter";
import { useParams, useRouter } from "next/navigation";
import { IMeeting } from "@/model/meetings";
import { useEffect, useState } from "react";
import { useMeeting } from "@/hooks/useMeeting";
import { localDateToISOString } from "@/util/formatDate";

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

const EditMeeting = () => {
  const { id } = useParams();
  const { token } = useSession();

  const initialMeeting = useMeeting(id);
  const router = useRouter();

  const [data, setData] = useState<IFormData>({});
  const [formState, setFormState] = useState<FormState>("READY");

  const isLoading = formState === "LOADING";

  const isFormValid = () => {
    return Object.values(data).length >= 5;
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
      await new EditMeetingAdapter(token).register(data as IMeeting);
      router.push("/");
      setFormState("READY");
    } catch {
      setData({});
      setFormState("FAILED");
    }
  };

  useEffect(() => {
    if (data.name) return;
    if (initialMeeting?.name) {
      setData({
        ...initialMeeting,
        date: localDateToISOString(initialMeeting.date),
      });
    }
  }, [initialMeeting]);

  if (!initialMeeting)
    return (
      <ContentBox>
        <strong>Edit meeting</strong>
        <hr />
        <br />
        <center>
          <LoadingIcon />
        </center>
        <br />
      </ContentBox>
    );

  return (
    <ContentBox>
      <strong>Edit meeting</strong>
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
          {isLoading ? "Loading..." : "Edit meeting"}
        </button>
      </form>
    </ContentBox>
  );
};

export default EditMeeting;
