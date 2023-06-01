import { AxiosError } from "axios";

const handleServerErrors = (err: AxiosError | unknown) => {
  if (!(err instanceof AxiosError)) return (window.location.pathname = "/");

  const STATUS_CODE = err.response?.status;

  switch (STATUS_CODE) {
    case 401:
      return (window.location.pathname = "/login");
    case 404:
      alert("Page not found");
      return (window.location.pathname = "/");
    default:
      alert("Unexpected error");
      return (window.location.pathname = "/");
  }
};

export { handleServerErrors };
