import { useForm } from 'react-hook-form';
import { registerSchema } from '../../../schema/formSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
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

const AddModal = ({ open, onClose, onAddUser }) => {
  const handleClose = () => {
    onClose();
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const formSubmitHandler = (data) => {
    if (isValid) {
      onAddUser(data);
    }
  };

  return (
    <Box>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(formSubmitHandler)}>
            <FormGroup>
              <TextField
                {...register('name')}
                label="Name"
                name="name"
                className="name"
                fullWidth
                sx={{ marginBottom: '16px' }}
              />
              {errors.name ? (
                <Typography variant="body2" color="error">
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
                <Typography variant="body2" color="error">
                  {errors.age.message}
                </Typography>
              ) : null}
              <TextField
                {...register('weight')}
                label="Weight"
                name="weight"
                className="weight"
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
                <Typography variant="body2" color="error">
                  {errors.weight.message}
                </Typography>
              ) : null}
              <TextField
                {...register('height')}
                label="Height"
                name="height"
                className="height"
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
                <Typography variant="body2" color="error">
                  {errors.height.message}
                </Typography>
              ) : null}
              <TextField
                {...register('phone')}
                label="Phone"
                name="phone"
                className="phone"
                fullWidth
                sx={{ marginBottom: '16px' }}
              />
              {errors.phone ? (
                <Typography variant="body2" color="error">
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
                <Typography variant="body2" color="error">
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

AddModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onAddUser: PropTypes.func.isRequired,
};

export default AddModal;
