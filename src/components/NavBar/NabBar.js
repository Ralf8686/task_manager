import React, { Component } from 'react';
import styled from 'styled-components';
import Logo from '../Logo/Logo';
import BaseText from '../BaseText/BaseText';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Settings from 'material-ui/svg-icons/action/settings';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Feedback from 'material-ui/svg-icons/action/feedback';
import VerifiedUser from 'material-ui/svg-icons/action/verified-user';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';

const NavBarWrapper = styled.div`
  height: ${({ theme }) => theme.sizes.navBar};
  background-color: ${({ theme }) => theme.colors.navBar};
  display: flex;
  justify-content: space-between;
`;

const NavBarLeft = styled.div`
  display: flex;
  align-items: center;
`;
const NavBarRight = styled.div`
  padding-right: 80px;
  display: flex;
  align-items: center;
`;

const PageTitle = styled(BaseText)`
  margin-left: 30px;
`;

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  handleToggle = () => this.setState({ open: !this.state.open });
  render() {
    return (
      <NavBarWrapper>
        <NavBarLeft>
          <Logo onClick={this.handleToggle} />
          <Drawer open={this.state.open}>
            <MenuItem>Menu Item</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
          </Drawer>
          <PageTitle color="white" type="pageTitle">
            ADMIN
          </PageTitle>
        </NavBarLeft>
        <NavBarRight>
          <BaseText color="white" type="body">
            Erica
          </BaseText>
          <IconMenu
            iconButtonElement={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            iconStyle={{
              color: '#ffffff'
            }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem primaryText="Account Info" leftIcon={<AccountCircle />} />
            <MenuItem primaryText="Settings" leftIcon={<Settings />} />
            <MenuItem primaryText="Feedback" leftIcon={<Feedback />} />
            <MenuItem
              primaryText="Administration"
              leftIcon={<VerifiedUser />}
            />
            <Divider />
            <MenuItem primaryText="Sign out" leftIcon={<ExitToApp />} />
          </IconMenu>
        </NavBarRight>
      </NavBarWrapper>
    );
  }
}
