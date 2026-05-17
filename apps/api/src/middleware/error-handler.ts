import { ZodError } from "zod";
import { AppError } from "@/utils/errors";

export function errorHandler(err: any, c: any) {
  console.error(err);

  // zod validation errors
  if (err instanceof ZodError) {
    return c.json(
      {
        success: false,

        error: {
          code: "VALIDATION_ERROR",

          message: "Validation failed",

          details: err.issues,
        },
      },
      400,
    );
  }

  // custom app errors
  if (err instanceof AppError) {
    return c.json(
      {
        success: false,

        error: {
          code: err.code,
          message: err.message,
        },
      },
      err.statusCode,
    );
  }

  // unknown errors
  return c.json(
    {
      success: false,

      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      },
    },
    500,
  );
}
