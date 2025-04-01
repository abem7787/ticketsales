import React from 'react';
import { Tabs, Tab, Typography, Box } from '@material-ui/core';
import MyTickets from '../components/MyTickets';
import PurchaseHistory from '../components/PurchaseHistory';
import ProfileSettings from '../components/ProfileSettings';

function TabPanel(props) {
  // Tab panel implementation
}

const UserDashboard = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="dashboard">
      <Typography variant="h4">My Account</Typography>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="My Tickets" />
        <Tab label="Purchase History" />
        <Tab label="Settings" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <MyTickets />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PurchaseHistory />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProfileSettings />
      </TabPanel>
    </div>
  );
};

export default UserDashboard;