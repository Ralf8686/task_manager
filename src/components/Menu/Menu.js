import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Settings from 'material-ui/svg-icons/action/settings';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Feedback from 'material-ui/svg-icons/action/feedback';
import VerifiedUser from 'material-ui/svg-icons/action/verified-user';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';

const Menu = ({ color }) =>
  <IconMenu
    iconButtonElement={
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    }
    iconStyle={{
      color
    }}
    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
  >
    <MenuItem primaryText="Account Info" leftIcon={<AccountCircle />} />
    <MenuItem primaryText="Settings" leftIcon={<Settings />} />
    <MenuItem primaryText="Feedback" leftIcon={<Feedback />} />
    <MenuItem primaryText="Administration" leftIcon={<VerifiedUser />} />
    <Divider />
    <MenuItem primaryText="Sign out" leftIcon={<ExitToApp />} />
  </IconMenu>;

export default Menu;
