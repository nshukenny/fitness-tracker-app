import Box from '@mui/material/Box';
import AdminNavbar from '../../components/Navbars/AdminNavbar.jsx';
//import Header from '../../components/Headers/Header.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import WorkoutsTable from './WorkoutsTable.jsx';

const WorkoutsPage = () => {
  return (
    <Box>
      <Sidebar style={{ width: '250px' }} />
      <Box style={{ marginLeft: '220px' }}>
        <AdminNavbar />
        {/* <Header /> */}
        <Box style={{ marginTop: '20px' }}>
          <WorkoutsTable />
        </Box>
      </Box>
    </Box>
  );
};

export default WorkoutsPage;
