import { toast } from "react-hot-toast";

export const useToast = () => {
  // Function to display toast notifications
  const showToast = ({
    error = null,
    success = false,
    successMessage = "Operation successful",
    errorMessage = "An error occurred",
  }: {
    error?: string | null;
    success?: boolean;
    successMessage?: string;
    errorMessage?: string;
  }) => {
    if (error) {
      toast.error(error); // Directly use error since it's a string or null
    } else if (success) {
      toast.success(successMessage);
    }
  };

  // Function to dismiss all toasts
  const dismissAllToasts = () => {
    toast.dismiss();
  };

  return { showToast, dismissAllToasts };
};
