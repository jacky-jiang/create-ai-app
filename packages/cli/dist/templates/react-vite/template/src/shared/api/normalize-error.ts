import { AxiosError } from "axios";
import type { ApiError } from "./api-error";

interface ErrorResponseBody {
  message?: unknown;
}

export function normalizeApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    return {
      message: getSafeMessage(error),
      status: error.response?.status,
      code: error.code,
      details: error.response?.data,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: "Unknown error",
  };
}

function getSafeMessage(error: AxiosError): string {
  const responseData = error.response?.data as ErrorResponseBody | undefined;

  if (responseData && typeof responseData.message === "string") {
    return responseData.message;
  }

  return error.message || "Request failed";
}
