import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  UserId: yup
    .string('UserId should be a string')
    .required('UserId is required'),

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
