const localDateToISOString = (date: string) => {
  return new Date(date).toISOString().substring(0, 10);
};

export { localDateToISOString };
