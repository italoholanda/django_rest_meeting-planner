import Nav from "../Nav";

interface IProps {
  id: string;
}

const EditMeetingPageNav = ({ id }: IProps) => {
  const links = [
    {
      content: "⬅️ Cancel",
      url: `/meetings/${id}`,
    },
  ];

  return <Nav links={links} />;
};

export default EditMeetingPageNav;
