import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { registerSchema } from '../../../schema/formSchema';
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
  InputAdornment,
  Grid,
  Stack,
} from '@mui/material';
import { getUsers, updateUser } from '../../../store/users/thunks';

const EditModal = ({ open, onClose, userData }) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    onClose();
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  useEffect(() => {
    if (userData) {
      Object.keys(userData).forEach((key) => {
        setValue(key, userData[key]);
      });
    }
  }, [userData, setValue]);
  const formSubmitHandler = (data) => {
    if (isValid) {
      const { id: userId, ...updatedData } = data;
      dispatch(updateUser({ userId, updatedData }))
        .then(() => {
          showToast({
            message: 'User updated successfully.',
            title: 'User',
            type: 'success',
          });
          dispatch(getUsers());
          onClose();
        })
        .catch(() => {
          showToast({
            message: 'Failed to update user.',
            title: 'Error',
            type: 'error',
          });
        });
    }
  };
  return (
    <Box>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(formSubmitHandler)}>
            <FormGroup>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1} sx={{ mt: 2 }}>
                    <TextField
                      {...register('name')}
                      label="Name"
                      name="name"
                      fullWidth
                      sx={{ marginBottom: '16px' }}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1} sx={{ mt: 2 }}>
                    <TextField
                      {...register('age')}
                      label="Age"
                      name="age"
                      className="age"
                      type="number"
                      fullWidth
                      sx={{ marginBottom: '16px' }}
                      error={!!errors.age}
                      helperText={errors.age?.message}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <TextField
                      {...register('weight')}
                      label="Weight"
                      name="weight"
                      type="number"
                      fullWidth
                      sx={{ marginBottom: '16px' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">kg</InputAdornment>
                        ),
                      }}
                      error={!!errors.weight}
                      helperText={errors.weight?.message}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <TextField
                      {...register('height')}
                      label="Height"
                      name="height"
                      type="number"
                      fullWidth
                      sx={{ marginBottom: '16px' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">cm</InputAdornment>
                        ),
                      }}
                      error={!!errors.height}
                      helperText={errors.height?.message}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <TextField
                      {...register('phone')}
                      label="Phone"
                      name="phone"
                      fullWidth
                      sx={{ marginBottom: '16px' }}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <TextField
                      {...register('email')}
                      label="Email"
                      name="email"
                      type="email"
                      fullWidth
                      sx={{ marginBottom: '16px' }}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </FormGroup>
            <Box mt={4} display="flex" justifyContent="flex-end">
              <Button
                onClick={handleClose}
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
  userData: PropTypes.object,
};

export default EditModal;
