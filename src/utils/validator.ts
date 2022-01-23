const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const isValid = (
  value: string,
  rules: {
    required?: boolean;
    email?: boolean;
    password?: boolean;
  }
) => {
  const errors: string[] = [];

  if (!rules) return errors;
  if (rules.required && !value.trim()) errors.push("Value is required");
  if (rules.email && !emailRegex.test(value))
    errors.push("Please enter valid email !");
  if (rules.password && !passwordRegex.test(value))
    errors.push(
      "Password must contain at least eight characters, one letter, one special character and one number"
    );

  return errors;
};
