import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate, useParams, Link} from "react-router-dom";



export const mainListItems = (
 
  // const classes = useStyles();
  <React.Fragment>
    <ListItemButton component={Link} to='/home/1' activeStyle={{ backgroundColor: 'blue' }}>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    
    <ListItemButton component={Link} to="/produkkonven">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Produk Konvensional" />
    </ListItemButton>
    <ListItemButton component={Link} to="/produksyariah">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Produk Syariah" />
    </ListItemButton>
    <ListItemButton component={Link} to="/informasi">
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText primary="Informasi" />
    </ListItemButton>
    {/* <ListItemButton component={Link} to="/internal">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Internal" />
    </ListItemButton> */}
    <ListItemButton component={Link} to="/helpdesk">
      <ListItemIcon>
        <HelpIcon />
      </ListItemIcon>
      <ListItemText primary="Help" />
    </ListItemButton>
  </React.Fragment>
);


export const secondaryListItems = (
  <React.Fragment>
    <ListItemButton  component={Link} to="/strukturmenu">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Data Menu" />
    </ListItemButton>
    <ListItemButton  component={Link} to="/users">
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Data User" />
    </ListItemButton>
    <ListItemButton component={Link} to="/divisi">
      <ListItemIcon>
        <GroupIcon />
      </ListItemIcon>
      <ListItemText primary="Data Level" />
    </ListItemButton>
  </React.Fragment>
);