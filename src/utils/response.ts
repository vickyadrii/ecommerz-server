export const success = <T>(data: T, message?: string) => {
  return {
    status: "success",
    message,
    data,
  };
};

export const error = <T>(message: string, data?: T) => {
  return {
    status: "error",
    message,
    data: data || null,
  };
};
