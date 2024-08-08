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
  Grid,
  Stack,
} from '@mui/material';

const AddModal = ({ open, onClose, onAddUser }) => {
  const handleClose = () => {
    onClose();
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const formSubmitHandler = (data) => {
    if (isValid) {
      onAddUser(data);
      reset();
    }
  };

  return (
    <Box>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add User</DialogTitle>
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
                      className="name"
                      fullWidth
                      sx={{ marginBottom: '16px' }}
                    />
                    {errors.name && (
                      <Typography variant="body2" color="error">
                        {errors.name.message}
                      </Typography>
                    )}
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
                    />
                    {errors.age && (
                      <Typography variant="body2" color="error">
                        {errors.age.message}
                      </Typography>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
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
                    {errors.weight && (
                      <Typography variant="body2" color="error">
                        {errors.weight.message}
                      </Typography>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
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
                    {errors.height && (
                      <Typography variant="body2" color="error">
                        {errors.height.message}
                      </Typography>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <TextField
                      {...register('phone')}
                      label="Phone"
                      name="phone"
                      className="phone"
                      fullWidth
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
                    <TextField
                      {...register('email')}
                      label="Email"
                      name="email"
                      type="email"
                      fullWidth
                      sx={{ marginBottom: '16px' }}
                    />
                    {errors.email && (
                      <Typography variant="body2" color="error">
                        {errors.email.message}
                      </Typography>
                    )}
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

AddModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onAddUser: PropTypes.func.isRequired,
};

export default AddModal;
