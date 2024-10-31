import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  TableHead,
  TableRow,
  Button,
  TableCell,
  CardContent,
  TableContainer,
  Paper,
  Pagination,
  TextField,
} from '@mui/material';
import {
  getWorkouts,
  deleteWorkout,
  createWorkout,
} from '../../store/workouts/thunks.js';
import { getUsers } from '../../store/users/thunks.js';
import { selectAllWorkouts } from '../../store/workouts/selectors.js';
import { selectAllUsers } from '../../store/users/selectors.js';
import ConfirmationModal from './modals/ConfirmationModal.jsx';
import EditModal from './modals/EditModal.jsx';
import AddModal from './modals/AddModal.jsx';
import WorkoutsTableBody from './WorkoutsTableBody.jsx';
import { showToast } from '../../helpers/toast.js';
import { toast } from 'react-toastify';

const WorkoutsTable = () => {
  const dispatch = useDispatch();
  const workoutsData = useSelector(selectAllWorkouts);
  const usersData = useSelector(selectAllUsers);
  const workouts = workoutsData.data;
  const users = usersData.data;
  const { status } = workoutsData;

  const workoutTypes = ['Cardio', 'Strength', 'Flexibility', 'Balance'];

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getWorkouts());
      dispatch(getUsers());
    }
  }, [dispatch, status]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedWorkoutData, setSelectedWorkoutData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 5;

  const handleClick = (event, workoutId) => {
    setAnchorEl(event.currentTarget);
    setSelectedWorkoutId(workoutId);
  };

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const handleDeleteClick = () => {
    setAnchorEl(null);
    setOpenDeleteConfirmation(true);
  };

  const handleEditClick = (event, workoutId) => {
    setAnchorEl(null);
    setSelectedWorkoutId(workoutId);
    setOpenEditModal(true);
    const workoutData = workouts.find((workout) => workout.id === workoutId);
    setSelectedWorkoutData(workoutData);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenDeleteConfirmation(false);
    setOpenEditModal(false);
  };

  const handleDeleteConfirmation = async () => {
    try {
      await dispatch(deleteWorkout(selectedWorkoutId));
      showToast({
        message: 'Deleted successfully.',
        title: 'Workout',
        type: 'success',
      });
      setOpenDeleteConfirmation(false);
      dispatch(getWorkouts());
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleAddWorkout = async (workoutData) => {
    try {
      const maxId = Math.max(...workouts.map((workout) => workout.id), 0);
      const newWorkoutId = (maxId + 1).toString();

      const user = users.find((user) => user.id === workoutData.UserId);

      if (!user) {
        throw new Error('User not found');
      }

      const newWorkout = {
        id: newWorkoutId,
        UserId: workoutData.UserId,
        Type: workoutData.Type,
        Duration: parseInt(workoutData.Duration),
        CaloriesBurned: parseInt(workoutData.CaloriesBurned),
        DatePerformed: workoutData.DatePerformed,
      };

      await dispatch(createWorkout(newWorkout));
      showToast({
        message: 'Workout added successfully.',
        title: 'Workout',
        type: 'success',
      });
      setOpenAddModal(false);
      dispatch(getWorkouts());
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      showToast({
        message: 'Error adding workout.',
        title: 'Workout',
        type: 'error',
      });
    }
  };

  const handlePageChange = (event, value) => setCurrentPage(value);
  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  const filteredWorkouts = useMemo(() => {
    return workouts.filter((workout) => {
      const user = users.find((user) => user.id === workout.UserId);
      return user?.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [workouts, users, searchQuery]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredWorkouts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <>
      <Container className="mt--7" maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title="WORKOUTS"
                action={
                  <Button
                    variant="contained"
                    onClick={handleOpenAddModal}
                    style={{ marginRight: '9px' }}
                  >
                    Add Workout
                  </Button>
                }
              />
              <CardContent>
                <TextField
                  label="Search"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <TableContainer component={Paper}>
                  <table style={{ width: '100%' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>User Name</TableCell>
                        <TableCell>User Phone</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Calories Burned</TableCell>
                        <TableCell>Date Performed</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <WorkoutsTableBody
                      workouts={currentItems}
                      users={users}
                      status={status}
                      handleClick={handleClick}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                      anchorEl={anchorEl}
                      handleClose={handleClose}
                    />
                  </table>
                </TableContainer>
              </CardContent>
              <CardContent>
                <Pagination
                  count={Math.ceil(filteredWorkouts.length / itemsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  shape="rounded"
                  size="large"
                  siblingCount={1}
                  boundaryCount={1}
                  disabled={filteredWorkouts.length <= itemsPerPage}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <ConfirmationModal
        open={openDeleteConfirmation}
        onClose={handleClose}
        onConfirm={handleDeleteConfirmation}
      />
      <EditModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        workoutData={selectedWorkoutData}
        workoutTypes={workoutTypes}
        users={users}
      />
      <AddModal
        open={openAddModal}
        onClose={handleCloseAddModal}
        onAddWorkout={handleAddWorkout}
        users={users}
        workoutTypes={workoutTypes}
      />
    </>
  );
};

export default WorkoutsTable;
