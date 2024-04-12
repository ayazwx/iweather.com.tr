import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('* Please enter a valid email')
    .required('* Email required'),
  password: yup
    .string()
    .min(6, '* Password must be at least 6 characters')
    .max(12, '* Password can be at most 12 characters')
    .required('* Please enter your password'),
});

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email('* Please enter a valid email')
    .required('* Email required'),
  password: yup
    .string()
    .min(4, '* Password must be at least 6 characters')
    .max(12, '* Password can be at most 12 characters')
    .required('* Please enter a password'),
  acceptTerms: yup
    .bool()
    .oneOf([true], '* Please accept the terms and conditions'),
});
