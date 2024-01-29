import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const StyledTitle = styled('h3', {
  name: 'Toast',
  slot: 'Wrapper',
})(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: 14,
  marginBottom: 10,
  color: theme.palette.primary.light,
}));

const StyledDescription = styled('p', {
  name: 'AuthContent',
  slot: 'Wrapper',
})(() => ({
  fontSize: 11,
  fontWeight: 400,
}));

const ToastContent = ({ title, message }) => {
  return (
    <Box ml={3}>
      <StyledTitle>{title}</StyledTitle>
      <StyledDescription>{message}</StyledDescription>
    </Box>
  );
};

ToastContent.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ToastContent;
