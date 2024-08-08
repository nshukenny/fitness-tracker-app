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
  const { status } = usersData;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getUsers());
    }
  }, [dispatch, status]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 5;

  const handleClick = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const handleDeleteClick = () => {
    setAnchorEl(null);
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

  const handleDeleteConfirmation = async () => {
    try {
      await dispatch(deleteUser(selectedUserId));
      showToast({
        message: 'Deleted successfully.',
        title: 'User',
        type: 'success',
      });
      setOpenDeleteConfirmation(false);
      dispatch(getUsers());
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAddUser = async (userData) => {
    try {
      const maxId = Math.max(...users.map((user) => user.id));
      const newUserId = (maxId + 1).toString();
      userData.id = newUserId;
      await dispatch(createUser(userData));
      showToast({
        message: 'User added successfully.',
        title: 'User',
        type: 'success',
      });
      setOpenAddModal(false);
      dispatch(getUsers());
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handlePageChange = (event, value) => setCurrentPage(value);
  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [users, searchQuery]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

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
                      users={currentItems}
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
                  count={Math.ceil(filteredUsers.length / itemsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  shape="rounded"
                  size="large"
                  siblingCount={1}
                  boundaryCount={1}
                  disabled={filteredUsers.length <= itemsPerPage}
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
        userId={selectedUserId}
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
