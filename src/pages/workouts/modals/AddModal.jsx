import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { registerSchema } from '../../../schema/workoutSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Dialog,
  Box,
  DialogTitle,
  DialogContent,
  FormGroup,
  TextField,
  Typography,
  Grid,
  Stack,
  MenuItem,
  Select,
  InputLabel,
} from '@mui/material';
import { useState, useEffect } from 'react';

const AddModal = ({ open, onClose, onAddWorkout, users, workoutTypes }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const [selectedUser, setSelectedUser] = useState('');
  const [userPhone, setUserPhone] = useState('');

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
      const currentDate = new Date().toISOString(); // Get current date in ISO format
      const workoutData = {
        ...data,
        DatePerformed: currentDate, // Add current date to workout data
      };
      onAddWorkout(workoutData);
      reset();
      setSelectedUser('');
      setUserPhone('');
    }
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  return (
    <Box>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Workout</DialogTitle>
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
                      onChange={handleUserChange}
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
                      name="user.phone"
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
                    <InputLabel htmlFor="">Duration</InputLabel>
                    <TextField
                      {...register('Duration')}
                      label="Duration (minutes)"
                      name="Duration"
                      type="number"
                      fullWidth
                      sx={{ marginBottom: '16px' }}
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
                    <InputLabel htmlFor="type">Calories Burned</InputLabel>
                    <TextField
                      {...register('CaloriesBurned')}
                      label=""
                      name="CaloriesBurned"
                      type="number"
                      fullWidth
                      sx={{ marginBottom: '16px' }}
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

AddModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onAddWorkout: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired, // Prop for users list
  workoutTypes: PropTypes.array.isRequired, // Prop for workout types
};

export default AddModal;
