import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  name: yup
    .string('Name should be a string')
    .min(5, 'Name should have a minimum length of 5')
    .max(100, 'Name should have a maximum length of 100')
    .required('Name is required'),
  email: yup
    .string('Email should be a string')
    .email('Please provide a valid email address')
    .required('Email address is required'),
  age: yup
    .number('Age should be a number')
    .min(0, 'Age should not be negative')
    .max(100, 'Age should not exceed 100')
    .required('Age is required'),
  weight: yup
    .number('Weight should be a number')
    .min(5, 'Weight should be at least 5')
    .max(200, 'Weight should not exceed 200')
    .required('Weight is required'),
  height: yup
    .number('Height should be a number')
    .min(50, 'Height should be at least 50 cm')
    .max(200, 'Height should not exceed 200 cm')
    .required('Height is required'),
  phone: yup
    .string('Phone should be a string')
    .matches(
      /^(078|072|073)\d{7}$/,
      'Phone number must start with 078, 072, or 073 followed by 7 digits'
    )
    .required('Phone number is required'),
});
