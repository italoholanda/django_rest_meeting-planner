import Nav from "../Nav";

const MeetingPageNav = () => {
  const links = [
    {
      content: "⬅️ Back to meetings",
      url: "/",
    },
  ];

  return <Nav links={links} />;
};

export default MeetingPageNav;
