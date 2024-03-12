import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { registerSchema } from '../../../schema/formSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  Button,
  Dialog,
  Box,
  DialogTitle,
  DialogContent,
  FormGroup,
  TextField,
  InputAdornment,
  Typography,
} from '@mui/material';
import { updateUser } from '../../../store/users/thunks';

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
      dispatch(updateUser({ userId, updatedData }));
    }
  };
  return (
    <Box>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(formSubmitHandler)}>
            <FormGroup>
              <TextField
                {...register('name')}
                label="Name"
                name="name"
                fullWidth
                sx={{ marginBottom: '16px' }}
              />
              {errors.name ? (
                <Typography variant="body1" color="error">
                  {errors.name.message}
                </Typography>
              ) : null}
              <TextField
                {...register('age')}
                label="Age"
                name="age"
                className="age"
                type="number"
                fullWidth
                sx={{ marginBottom: '16px' }}
              />
              {errors.age ? (
                <Typography variant="body1" color="error">
                  {errors.age.message}
                </Typography>
              ) : null}
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
              />
              {errors.weight ? (
                <Typography variant="body1" color="error">
                  {errors.weight.message}
                </Typography>
              ) : null}
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
              />
              {errors.height ? (
                <Typography variant="body1" color="error">
                  {errors.height.message}
                </Typography>
              ) : null}
              <TextField
                {...register('phone')}
                label="Phone"
                name="phone"
                fullWidth
                sx={{ marginBottom: '16px' }}
              />
              {errors.phone ? (
                <Typography variant="body1" color="error">
                  {errors.phone.message}
                </Typography>
              ) : null}
              <TextField
                {...register('email')}
                label="Email"
                name="email"
                type="email"
                fullWidth
                sx={{ marginBottom: '16px' }}
              />
              {errors.email ? (
                <Typography variant="body1" color="error">
                  {errors.email.message}
                </Typography>
              ) : null}
            </FormGroup>
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
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

EditModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  //onUpdateUser: PropTypes.func.isRequired,
  userData: PropTypes.object,
};

export default EditModal;
