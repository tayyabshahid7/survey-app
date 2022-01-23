import Swal from "sweetalert2";

export const showAlert = (text: any, status: any) => {
  Swal.fire({
    toast: true,
    text: text,
    icon: status,
    timer: 5000,
    showConfirmButton: false,
    position: "top-right",
  });
};

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const isValid = (
    value: string,
    rules: {
      required?: boolean;
      minLength?: number;
      maxLength?: number;
      email?: boolean;
    }
) => {
  const errors: string[] = [];

  if (!rules) return errors;
  if (rules.required && !value.trim()) errors.push("Value is required");
  if (rules.minLength && value.length < rules.minLength)
    errors.push(`Minimum length required is ${rules.minLength}`);
  if (rules.maxLength && value.length > rules.maxLength)
    errors.push(`Maximum length required is ${rules.maxLength}`);
  if (rules.email && !emailRegex.test(value))
    errors.push("Please enter valid email !");

  return errors;
};


