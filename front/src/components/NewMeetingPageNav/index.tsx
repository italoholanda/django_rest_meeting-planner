import Nav from "../Nav";

const NewMeetingPageNav = () => {
  const links = [
    {
      content: "⬅️ Back to meetings",
      url: "/",
    },
  ];

  return <Nav links={links} />;
};

export default NewMeetingPageNav;
