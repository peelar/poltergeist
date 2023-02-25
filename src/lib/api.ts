type SuccessResponse<TData extends any> = {
  ok: true;
  data: TData;
};

export const createSuccessResponse = <TData extends any>(
  data: TData
): SuccessResponse<TData> => {
  return { data, ok: true };
};

type ErrorCause = "NOT_FOUND" | "UNAUTHORIZED" | "UNKNOWN";

type FailureResponse = {
  ok: false;
  error: {
    message: string;
    cause: ErrorCause;
  };
};

export const createFailureResponse = (
  message: string,
  cause: ErrorCause
): FailureResponse => {
  return {
    ok: false,
    error: {
      message,
      cause,
    },
  };
};
