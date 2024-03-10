import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import { getUsers, deleteUser, createUser } from '../../store/users/thunks';
import { selectAllUsers } from '../../store/users/selectors';
import ConfirmationModal from './modals/ConfirmationModal.jsx';
import EditModal from './modals/EditModal.jsx';
import AddModal from './modals/AddModal.jsx';
import UsersTableBody from './UsersTableBody.jsx';
import { showToast } from '../../helpers/toast';

const UsersTable = () => {
  const dispatch = useDispatch();
  const usersData = useSelector(selectAllUsers);
  const users = usersData.data;
  const statuss = usersData.status;

  useEffect(() => {
    if (statuss === 'idle') {
      dispatch(getUsers());
    }
  }, [dispatch, statuss]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);

  const handleClick = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };
  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleDeleteClick = (event, userId) => {
    setAnchorEl(null);
    setSelectedUserId(userId);
    setOpenDeleteConfirmation(true);
  };

  const handleEditClick = (event, userId) => {
    setAnchorEl(null);
    setSelectedUserId(userId);
    setOpenEditModal(true);
    const userData = users.find((user) => user.id === userId);
    setSelectedUserData(userData);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenDeleteConfirmation(false);
    setOpenEditModal(false);
  };

  const handleDeleteConfirmation = () => {
    dispatch(deleteUser(selectedUserId));
    setOpenDeleteConfirmation(false);
    showToast({
      message: 'Delete Successfully.',
      title: `user:`,
      type: 'success',
    });
    window.location.reload();
  };
  const handleAddUser = async (userData) => {
    try {
      const maxId = Math.max(...users.map((user) => user.id));
      const newUserId = maxId + 1;
      userData.id = newUserId;
      await dispatch(createUser(userData));
      showToast({
        message: 'User added successfully.',
        title: 'User',
        type: 'success',
      });
      window.location.reload();
      setOpenAddModal(false);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <>
      <Container className="mt--7" maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title="USERS"
                action={
                  <Button
                    variant="contained"
                    onClick={handleOpenAddModal}
                    style={{ marginRight: '9px' }}
                  >
                    Add User
                  </Button>
                }
              />
              <CardContent>
                <TableContainer component={Paper}>
                  <table style={{ width: '100%' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Weight</TableCell>
                        <TableCell>Height</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <UsersTableBody
                      users={users}
                      statuss={statuss}
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
                  count={3}
                  shape="rounded"
                  size="large"
                  siblingCount={1}
                  boundaryCount={1}
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
        EditModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        userId={selectedUserId}
        selectedUserId={selectedUserId}
        userData={selectedUserData}
      />
      <AddModal
        open={openAddModal}
        onClose={handleCloseAddModal}
        onAddUser={handleAddUser}
      />
    </>
  );
};

export default UsersTable;
