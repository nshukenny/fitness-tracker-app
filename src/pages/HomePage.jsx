import { useEffect } from 'react';
import {
  Box,
  Stack,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { handleLogout } from '../store/auth/Slice';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar.jsx';
import { isLoggedIn } from '../helpers/auth';
import AdminNavbar from '../components/Navbars/AdminNavbar.jsx';
import {
  People,
  MonetizationOn,
  AssignmentTurnedIn,
  TrendingUp,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const salesData = [
  { name: 'Jan', sales: 16000 },
  { name: 'Feb', sales: 12000 },
  { name: 'Mar', sales: 8000 },
  { name: 'Apr', sales: 4000 },
  { name: 'May', sales: 5000 },
  { name: 'Jun', sales: 14000 },
  { name: 'Jul', sales: 15000 },
  { name: 'Aug', sales: 17000 },
  { name: 'Sep', sales: 18000 },
  { name: 'Oct', sales: 19000 },
  { name: 'Nov', sales: 20000 },
  { name: 'Dec', sales: 21000 },
];

const trafficData = [
  { name: 'Desktop', value: 63 },
  { name: 'Tablet', value: 15 },
  { name: 'Phone', value: 22 },
];

const COLORS = ['#0088FE', '#FF8042', '#00C49F'];

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogoutClick = () => {
    dispatch(handleLogout());
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, ml: '220px', p: 3 }}>
        <AdminNavbar />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
          mt={8}
        >
          <Typography variant="h5" fontWeight="bold">
            Dashboard
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogoutClick}
            sx={{ borderRadius: 2, px: 3 }}
          >
            Logout
          </Button>
        </Stack>

        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={3}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Stack direction="row" gap={2} alignItems="center">
                  <MonetizationOn color="success" fontSize="large" />
                  <Box>
                    <Typography variant="h6">$24k</Typography>
                    <Typography color="text.secondary">Budget</Typography>
                  </Box>
                </Stack>
                <Typography variant="caption" color="success.main">
                  ↑ 12% since last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Stack direction="row" gap={2} alignItems="center">
                  <People color="primary" fontSize="large" />
                  <Box>
                    <Typography variant="h6">1.6k</Typography>
                    <Typography color="text.secondary">
                      Total Customers
                    </Typography>
                  </Box>
                </Stack>
                <Typography variant="caption" color="error.main">
                  ↓ 16% since last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Stack direction="row" gap={2} alignItems="center">
                  <AssignmentTurnedIn color="warning" fontSize="large" />
                  <Box>
                    <Typography variant="h6">75.5%</Typography>
                    <Typography color="text.secondary">
                      Task Progress
                    </Typography>
                  </Box>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={75.5}
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Stack direction="row" gap={2} alignItems="center">
                  <TrendingUp color="secondary" fontSize="large" />
                  <Box>
                    <Typography variant="h6">$15k</Typography>
                    <Typography color="text.secondary">Total Profit</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                Sales
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                Traffic Source
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={trafficData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {trafficData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <Stack direction="row" justifyContent="space-around" mt={2}>
                <Typography variant="caption">Desktop: 63%</Typography>
                <Typography variant="caption">Tablet: 15%</Typography>
                <Typography variant="caption">Phone: 22%</Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
