import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerSchema } from '../../../schema/workoutSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { showToast } from '../../../helpers/toast';
import {
  Button,
  Dialog,
  Box,
  DialogTitle,
  DialogContent,
  FormGroup,
  TextField,
  InputLabel,
  Grid,
  Stack,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { getWorkouts, updateWorkout } from '../../../store/workouts/thunks';

const EditModal = ({ open, onClose, workoutData, users, workoutTypes }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const [selectedUser, setSelectedUser] = useState(
    workoutData?.UserId?.id || ''
  );
  const [userPhone, setUserPhone] = useState('');

  useEffect(() => {
    if (workoutData) {
      Object.keys(workoutData).forEach((key) => {
        if (key === 'UserId') {
          const user = users.find((u) => u.id === workoutData[key]?.id);
          setSelectedUser(user?.id || '');
          setUserPhone(user?.phone || '');
        } else {
          setValue(key, workoutData[key]);
        }
      });
    }
  }, [workoutData, setValue, users]);

  useEffect(() => {
    if (selectedUser) {
      const user = users.find((user) => user.id === selectedUser);
      if (user) {
        setUserPhone(user.phone);
        setValue('phone', user.phone);
      }
    }
  }, [selectedUser, users, setValue]);

  const formSubmitHandler = (data) => {
    if (isValid) {
      const { id: workoutId, ...updatedData } = data;
      const user = users.find((user) => user.id === selectedUser);
      if (user) {
        updatedData.UserId = {
          id: user.id,
          name: user.name,
          phone: user.phone,
        };
      } else {
        throw new Error('User not found');
      }
      delete updatedData.phone;
      delete updatedData.name;

      dispatch(updateWorkout({ workoutId, updatedData }))
        .then(() => {
          showToast({
            message: 'Workout updated successfully.',
            title: 'Workout',
            type: 'success',
          });
          dispatch(getWorkouts());
          onClose();
        })
        .catch((error) => {
          console.error('Error updating Workout:', error);
          showToast({
            message: 'Failed to update workout.',
            title: 'Error',
            type: 'error',
          });
        });
    }
  };

  return (
    <Box>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Workout</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(formSubmitHandler)}>
            <FormGroup>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1} sx={{ mt: 2 }}>
                    <InputLabel htmlFor="username">User Name</InputLabel>
                    <Select
                      {...register('name')}
                      label="User Name"
                      name="name"
                      fullWidth
                      value={selectedUser}
                      onChange={(e) => setSelectedUser(e.target.value)}
                      sx={{ marginBottom: '16px' }}
                    >
                      {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.name && (
                      <Typography variant="body2" color="error">
                        {errors.name.message}
                      </Typography>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack spacing={1} sx={{ mt: 2 }}>
                    <InputLabel htmlFor="userphone">User Phone</InputLabel>
                    <TextField
                      {...register('phone')}
                      label=""
                      name="phone"
                      fullWidth
                      value={userPhone}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ marginBottom: '16px' }}
                    />
                    {errors.phone && (
                      <Typography variant="body2" color="error">
                        {errors.phone.message}
                      </Typography>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="type">Type</InputLabel>
                    <Select
                      {...register('Type')}
                      label="Type"
                      name="Type"
                      fullWidth
                      sx={{ marginBottom: '16px' }}
                      defaultValue={workoutData?.Type || ''}
                    >
                      {workoutTypes.map((Type) => (
                        <MenuItem key={Type} value={Type}>
                          {Type}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.Type && (
                      <Typography variant="body2" color="error">
                        {errors.Type.message}
                      </Typography>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="Duration">Duration</InputLabel>
                    <TextField
                      {...register('Duration')}
                      label="Duration (minutes)"
                      name="Duration"
                      type="number"
                      fullWidth
                      sx={{ marginBottom: '16px' }}
                      defaultValue={workoutData?.Duration || ''}
                    />
                    {errors.Duration && (
                      <Typography variant="body2" color="error">
                        {errors.Duration.message}
                      </Typography>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="CaloriesBurned">
                      Calories Burned
                    </InputLabel>
                    <TextField
                      {...register('CaloriesBurned')}
                      label="Calories Burned"
                      name="CaloriesBurned"
                      type="number"
                      fullWidth
                      sx={{ marginBottom: '16px' }}
                      defaultValue={workoutData?.CaloriesBurned || ''}
                    />
                    {errors.CaloriesBurned && (
                      <Typography variant="body2" color="error">
                        {errors.CaloriesBurned.message}
                      </Typography>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </FormGroup>

            <Box mt={4} display="flex" justifyContent="flex-end">
              <Button
                onClick={onClose}
                variant="outlined"
                color="secondary"
                sx={{ marginRight: '16px' }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

EditModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  workoutData: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  workoutTypes: PropTypes.array.isRequired,
};

export default EditModal;
