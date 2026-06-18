import { AuthProps, getMe } from "@/services/auth";
import { useRouter } from "next/navigation";
export interface FormErrors {
  username?: string;
  password?: string;
  general?: string;
}

export const validate = (
  formData: AuthProps,
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>,
): boolean => {
  const newErrors: FormErrors = {};
  if (!formData.username.trim()) newErrors.username = "Username is required.";

  const password = formData.password;
  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    newErrors.password =
      "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, and one number.";
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const checkUser = async () => {
  const data = await getMe();
  if (data.success) {
    console.log("Authorized");
    console.log(data);
    return true;
  } else {
    console.log("Not authorized");
    return false;
  }
};
