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

export default function Sidebar() {
  const list = (
    <Box
      sx={{
        width: 200,
        paddingTop: 20,
      }}
      role="presentation"
    >
      <List>
        {['Dashboard', 'Users', 'Work Sessions'].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            sx={{ marginTop: index === 0 ? 0 : 0 }}
          >
            {' '}
            {text === 'User Profile' ? (
              <Link
                to="/dashboard/users"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  width: '100%',
                }}
              >
                <ListItemButton
                  sx={{
                    width: '100%',
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                    },
                  }}
                >
                  <ListItemIcon>
                    <PersonIcon sx={{ color: '#ff5722' }} />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            ) : (
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <ComputerIcon sx={{ color: '#2196f3' }} />
                  ) : (
                    <PersonIcon sx={{ color: '#ff5722' }} />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
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
        {list}
      </Drawer>
    </div>
  );
}
