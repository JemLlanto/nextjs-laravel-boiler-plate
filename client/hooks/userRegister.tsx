import Swal from "sweetalert2";
import { AuthProps, register } from "@/services/auth";
import { getErrorMessage } from "@/utils/errorHandler.helper";

export const useRegister = () => {
  const handleRegister = async (
    formData: AuthProps,
    validate: any,
    setErrors: any,
    setLoading: any,
    handleClose: () => void,
  ) => {
    if (!validate(formData, setErrors)) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await register(formData);

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: getErrorMessage(response.data),
        });

        setErrors(response.data.errors || {});
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: response.data.message,
      });

      handleClose();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Something went wrong. Please try again.",
      });

      setErrors({ general: "Registration failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister };
};
