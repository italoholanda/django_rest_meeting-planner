export interface IMeeting {
  name: string;
  date: string;
  hour: string;
  roomId: string;
  duration: string;
  id: string;
}

export interface IMeetingDetails extends IMeeting {
  room: {
    name: string;
    floor: string;
  };
}
