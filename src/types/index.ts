export type Query = {
  page?: number;
  limit?: number;
  offset?: number;
};

export type Response<T> = {
  status?: "success" | "error";
  message?: string;
  data: T;
};
