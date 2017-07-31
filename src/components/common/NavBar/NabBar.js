import React, { Component } from 'react';
import styled from 'styled-components';
import Logo from '../Logo/Logo';
import BaseText from '../BaseText/BaseText';
import Menu from '../Menu/Menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export const NavBarWrapper = styled.div`
  height: ${({ theme }) => theme.sizes.navBar};
  background-color: ${({ theme, selectMode }) =>
    selectMode ? theme.colors.selectedRow : theme.colors.navBar};
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

export const PageTitle = styled(BaseText)`
  margin-left: 30px;
`;

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  handleToggle = () => this.setState({ open: !this.state.open });
  render() {
    const color = this.props.selectMode ? '#000' : '#fff';
    return (
      <NavBarWrapper selectMode={this.props.selectMode}>
        <NavBarLeft>
          <Logo className="t-logo" onClick={this.handleToggle} />
          <Drawer open={this.state.open}>
            <MenuItem>Menu Item</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
          </Drawer>
          <PageTitle color={color} type="pageTitle">
            ADMIN
          </PageTitle>
        </NavBarLeft>
        <NavBarRight>
          <BaseText color={color} type="body">
            Erica
          </BaseText>
          <Menu color={color} />
        </NavBarRight>
      </NavBarWrapper>
    );
  }
}
