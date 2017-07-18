import React from 'react';
import styled from 'styled-components';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import TextField from 'material-ui/TextField';
import { withState, compose } from 'recompose';
import theme from '../../theme';

const SearchControlWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const SearchField = styled.div`
  width: ${({ isOpen }) => (isOpen ? '260px' : '0')};
  transition: padding, width .3s ease;
  display: flex;
  align-items: center;
  padding-left: ${({ isOpen }) => (isOpen ? '10px' : '0')};
  box-sizing: border-box;
  overflow: hidden;
`;

const IconStyle = { width: 24, height: 24, padding: 0 };

const SearchControl = ({ isOpen, toggle, value, onChange }) =>
  <SearchControlWrapper>
    <IconButton
      id="SearchToggleButton"
      onTouchTap={() => toggle(!isOpen)}
      style={IconStyle}
    >
      <ActionSearch color="#fff" />
    </IconButton>
    <SearchField isOpen={isOpen}>
      <TextField
        id="Search"
        placeholder="Search"
        value={value}
        inputStyle={{
          color: theme.colors.inactiveText
        }}
        onChange={(event, newValue) => onChange(newValue)}
      />
      <IconButton
        onTouchTap={() => onChange('')}
        style={{ ...IconStyle, marginLeft: -24 }}
      >
        <NavigationClose color="#fff" />
      </IconButton>
    </SearchField>
  </SearchControlWrapper>;

export default compose(withState('isOpen', 'toggle', false))(SearchControl);
