import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  name: yup
    .string('User Name should be a string')
    .required('User Name is required'),
  phone: yup
    .string('Phone should be a string')
    .matches(
      /^(078|072|073)\d{7}$/,
      'Phone number must start with 078, 072, or 073 followed by 7 digits'
    )
    .required('Phone number is required'),
  Type: yup
    .string('Type should be a string')
    .oneOf(
      ['Cardio', 'Strength', 'Flexibility', 'Balance'],
      'Invalid workout type'
    )
    .required('Type is required'),
  Duration: yup
    .number('Duration should be a number')
    .min(1, 'Duration should be at least 1 minute')
    .required('Duration is required'),
  CaloriesBurned: yup
    .number('Calories Burned should be a number')
    .min(0, 'Calories Burned should be at least 0')
    .required('Calories Burned is required'),
});
