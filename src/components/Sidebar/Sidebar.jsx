import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ComputerIcon from '@mui/icons-material/Computer';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';

const menuItems = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon sx={{ color: '#2196f3' }} />,
    link: '/dashboard/home',
  },
  {
    text: 'Users',
    icon: <PersonIcon sx={{ color: '#ff5722' }} />,
    link: '/dashboard/users',
  },
  {
    text: 'Work Sessions',
    icon: <ComputerIcon sx={{ color: '#2196f3' }} />,
    link: '/dashboard/workouts',
  },
];

export default function Sidebar() {
  return (
    <Drawer
      anchor="left"
      open={true}
      variant="persistent"
      sx={{
        '& .MuiDrawer-paper': {
          width: 220,
          boxSizing: 'border-box',
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
        },
      }}
    >
      <Box sx={{ width: 200, paddingTop: 20 }} role="presentation">
        <List>
          {menuItems.map(({ text, icon, link }) => (
            <ListItem key={text} disablePadding>
              <Link
                to={link}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  width: '100%',
                }}
              >
                <ListItemButton
                  sx={{
                    width: '100%',
                    '&:hover': { backgroundColor: '#f0f0f0' },
                  }}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
}
