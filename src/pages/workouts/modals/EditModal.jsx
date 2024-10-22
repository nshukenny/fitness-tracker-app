import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerSchema } from '../../../schema/workoutSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { showToast } from '../../../helpers/toast';
import { toast } from 'react-toastify';
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

  const [selectedUser, setSelectedUser] = useState(workoutData?.UserId || '');
  const [selectedType, setSelectedType] = useState(workoutData?.Type || '');

  useEffect(() => {
    if (workoutData) {
      Object.keys(workoutData).forEach((key) => {
        setValue(key, workoutData[key]);
      });
      setSelectedUser(workoutData.UserId);
      setSelectedType(workoutData.Type);
    }
  }, [workoutData, setValue]);

  const formSubmitHandler = (data) => {
    if (isValid) {
      const { id: workoutId, ...updatedData } = data;
      updatedData.UserId = selectedUser;
      updatedData.Type = selectedType;
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
          toast.error(`Error: ${error.message}`);
          showToast({
            message: 'Failed to update workout.',
            title: 'Error',
            type: 'error',
          });
        });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Workout</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <FormGroup>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1} sx={{ mt: 2 }}>
                  <InputLabel htmlFor="UserId">User Name</InputLabel>
                  <Select
                    {...register('UserId')}
                    label="User Name"
                    name="UserId"
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
                  {errors.UserId && (
                    <Typography variant="body2" color="error">
                      {errors.UserId.message}
                    </Typography>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1} sx={{ mt: 2 }}>
                  <InputLabel htmlFor="Type">Workout Type</InputLabel>
                  <Select
                    {...register('Type')}
                    label="Type"
                    name="Type"
                    fullWidth
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    sx={{ marginBottom: '16px' }}
                  >
                    {workoutTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
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
