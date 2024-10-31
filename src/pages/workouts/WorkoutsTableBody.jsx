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

const WorkoutsTableBody = ({
  workouts,
  users,
  status,
  handleClick,
  handleDeleteClick,
  anchorEl,
  handleClose,
  handleEditClick,
}) => {
  const [clickedWorkoutId, setClickedWorkoutId] = useState(null);

  const getUserInfo = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user
      ? { name: user.name, phone: user.phone }
      : { name: 'Unknown', phone: 'Unknown' };
  };

  const sortedWorkouts = workouts.sort(
    (a, b) => new Date(b.DatePerformed) - new Date(a.DatePerformed)
  );

  return (
    <TableBody>
      {status === 'loading' ? (
        <TableRow>
          <TableCell
            colSpan={8}
            sx={{ textAlign: 'center', fontWeight: 'bold' }}
          >
            Loading...
          </TableCell>
        </TableRow>
      ) : status === 'error' ? (
        <TableRow>
          <TableCell
            colSpan={8}
            sx={{ textAlign: 'center', fontWeight: 'bold' }}
          >
            Error fetching workouts!
          </TableCell>
        </TableRow>
      ) : !workouts || !workouts.length ? (
        <TableRow>
          <TableCell
            colSpan={8}
            sx={{ textAlign: 'center', fontWeight: 'bold' }}
          >
            No workouts found!
          </TableCell>
        </TableRow>
      ) : (
        sortedWorkouts.map((workout, index) => {
          const userInfo = getUserInfo(workout.UserId);
          return (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{userInfo.name}</TableCell>
              <TableCell>{userInfo.phone}</TableCell>
              <TableCell>{workout.Type}</TableCell>
              <TableCell>{workout.Duration}</TableCell>
              <TableCell>{workout.CaloriesBurned}</TableCell>
              <TableCell>{workout.DatePerformed}</TableCell>
              <TableCell>
                <IconButton
                  onClick={(event) => {
                    handleClick(event, workout.id);
                    setClickedWorkoutId(workout.id);
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
                    onClick={(event) =>
                      handleEditClick(event, clickedWorkoutId)
                    }
                  >
                    Edit
                  </MenuItem>
                  <MenuItem onClick={(event) => handleDeleteClick(event)}>
                    Delete
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          );
        })
      )}
    </TableBody>
  );
};

WorkoutsTableBody.propTypes = {
  workouts: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  status: PropTypes.oneOf(['idle', 'loading', 'error', 'success']).isRequired,
  handleClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
};

export default WorkoutsTableBody;
