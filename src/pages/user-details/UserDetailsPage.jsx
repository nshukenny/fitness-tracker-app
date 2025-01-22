import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';

import { selectAllUsers } from '../../store/users/selectors.js';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import AdminNavbar from '../../components/Navbars/AdminNavbar.jsx';
import EditModal from './modals/EditModal.jsx';

const UserDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const users = useSelector(selectAllUsers).data;

  const selectedUser = useMemo(
    () => users.find((user) => user.id === id),
    [users, id]
  );

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  if (!selectedUser) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          User not found!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/dashboard/users')}
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar
          style={{
            width: '250px',
            flexShrink: 0,
            position: 'fixed',
            height: '100vh',
            top: 0,
          }}
        />

        <div
          style={{
            flex: 1,
            marginLeft: '220px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <AdminNavbar />

          <div style={{ padding: '20px' }}>
            <Grid
              container
              spacing={3}
              justifyContent="center"
              alignItems="stretch"
            >
              <Grid item xs={12}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px',
                  }}
                >
                  <div>
                    <Typography
                      variant="h4"
                      style={{ color: '#3f51b5', fontWeight: 'bold' }}
                    >
                      User Profile Details
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      style={{ marginBottom: '20px', color: '#666' }}
                    >
                      View and manage user information and settings
                    </Typography>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/dashboard/users')}
                  >
                    Back
                  </Button>
                </div>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Card style={{ height: '100%' }}>
                  <CardContent
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                    }}
                  >
                    <Avatar
                      style={{
                        margin: '0 auto',
                        backgroundColor: '#3f51b5',
                        width: '100px',
                        height: '100px',
                        fontSize: '48px',
                      }}
                    >
                      {selectedUser.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography
                      variant="h5"
                      style={{
                        marginTop: '10px',
                        fontWeight: 'bold',
                        color: '#3f51b5',
                      }}
                    >
                      {selectedUser.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Card style={{ height: '100%' }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      style={{ marginBottom: '20px', color: '#3f51b5' }}
                    >
                      Personal Information
                    </Typography>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell
                            style={{ fontWeight: 'bold', width: '30%' }}
                          >
                            Full Name
                          </TableCell>
                          <TableCell>{selectedUser.name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ fontWeight: 'bold' }}>
                            Email
                          </TableCell>
                          <TableCell>{selectedUser.email}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ fontWeight: 'bold' }}>
                            Age
                          </TableCell>
                          <TableCell>{selectedUser.age}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ fontWeight: 'bold' }}>
                            Phone
                          </TableCell>
                          <TableCell>{selectedUser.phone}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ marginTop: '20px' }}
                      onClick={handleOpenEditModal}
                    >
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <EditModal
              open={isEditModalOpen}
              onClose={handleCloseEditModal}
              userData={selectedUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
