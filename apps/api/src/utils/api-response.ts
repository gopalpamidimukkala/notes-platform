export const successResponse = <T>(
  data: T,
  message = "Success"
) => ({
  success: true,
  message,
  data,
});

export const errorResponse = (
  message = "Something went wrong"
) => ({
  success: false,
  message,
});