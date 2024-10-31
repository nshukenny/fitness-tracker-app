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
import { useState } from 'react';

const AddModal = ({ open, onClose, onAddWorkout, users, workoutTypes }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      Type: workoutTypes[0],
    },
  });

  const [selectedUser, setSelectedUser] = useState('');
  const [selectedType, setSelectedType] = useState(workoutTypes[0]);

  const formSubmitHandler = (data) => {
    if (isValid) {
      const currentDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      const workoutData = {
        ...data,
        UserId: selectedUser,
        DatePerformed: currentDate,
      };
      onAddWorkout(workoutData);
      reset();
      setSelectedUser('');
      setSelectedType(workoutTypes[0]);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Workout</DialogTitle>
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
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    {...register('Type')}
                    label="Type"
                    name="Type"
                    fullWidth
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

AddModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onAddWorkout: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  workoutTypes: PropTypes.array.isRequired,
};

export default AddModal;
