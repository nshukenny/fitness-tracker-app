import Box from '@mui/material/Box';
import AdminNavbar from '../../components/Navbars/AdminNavbar.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import WorkoutsTable from './WorkoutsTable.jsx';

const WorkoutsPage = () => {
  return (
    <Box>
      <Sidebar style={{ width: '250px' }} />
      <Box style={{ marginLeft: '220px' }}>
        <AdminNavbar />
        <Box style={{ marginTop: '20px' }}>
          <WorkoutsTable />
        </Box>
      </Box>
    </Box>
  );
};

export default WorkoutsPage;
