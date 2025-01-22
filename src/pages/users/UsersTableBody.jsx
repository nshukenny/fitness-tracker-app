import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

const UsersTableBody = ({
  users,
  statuss,
  handleClick,
  handleDeleteClick,
  anchorEl,
  handleClose,
  handleEditClick,
}) => {
  const navigate = useNavigate();
  const [clickedUserId, setClickedUserId] = useState(null);

  return (
    <TableBody>
      {statuss === 'loading' ? (
        <TableRow>
          <TableCell
            colSpan={8}
            sx={{ textAlign: 'center', fontWeight: 'bold' }}
          >
            Loading...
          </TableCell>
        </TableRow>
      ) : statuss === 'error' ? (
        <TableRow>
          <TableCell
            colSpan={8}
            sx={{ textAlign: 'center', fontWeight: 'bold' }}
          >
            Error fetching users!
          </TableCell>
        </TableRow>
      ) : !users || !users.length ? (
        <TableRow>
          <TableCell
            colSpan={8}
            sx={{ textAlign: 'center', fontWeight: 'bold' }}
          >
            No users found!
          </TableCell>
        </TableRow>
      ) : (
        users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.age}</TableCell>
            <TableCell>{user.weight}</TableCell>
            <TableCell>{user.height}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <IconButton
                onClick={(event) => {
                  handleClick(event, user.id);
                  setClickedUserId(user.id);
                }}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={(event) => handleEditClick(event, clickedUserId)}
                >
                  Edit
                </MenuItem>
                <MenuItem onClick={(event) => handleDeleteClick(event)}>
                  Delete
                </MenuItem>
                <MenuItem onClick={() => navigate(`/users/${clickedUserId}`)}>
                  User Details
                </MenuItem>
              </Menu>
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  );
};

UsersTableBody.propTypes = {
  users: PropTypes.array.isRequired,
  statuss: PropTypes.oneOf(['idle', 'loading', 'error', 'success']).isRequired,
  handleClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
};

export default UsersTableBody;
