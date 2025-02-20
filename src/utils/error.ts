export const getErrorMessage = (response: any): string => {
  if (!response || !response.message) {
    return "Unknown error occurred.";
  }

  console.log(">>> Check error.ts");

  if (Array.isArray(response.message) && response.message.length > 0) {
    return formatErrorMessage(String(response.message[0]));
  }

  return formatErrorMessage(String(response.message));
};

const formatErrorMessage = (message: string): string => {
  if (!message || typeof message !== "string") return "Error occurred.";
  return message.charAt(0).toUpperCase() + message.slice(1);
};
