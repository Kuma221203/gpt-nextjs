export type ErrorResponse = {
  message?: string | string[];
};

export const getErrorMessage = (response?: ErrorResponse): string => {
  if (!response || !response.message) {
    return "Unknown error occurred.";
  }
  console.log(">>> Check error.ts");
  const message: string = Array.isArray(response.message) && response.message.length > 0 
    ? response.message[0] 
    : response.message as string; 
  return formatErrorMessage(message);
};

const formatErrorMessage = (message: string): string => {
  return message.charAt(0).toUpperCase() + message.slice(1);
};
