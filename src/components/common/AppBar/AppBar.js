import styled from 'styled-components';
import Container from '../Container/Container';

export const AppBarContainer = styled(Container)`
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 120px;
`;

export const AppBarWrapper = styled.div`
  background-color: ${({ theme, selectedMode }) =>
    selectedMode ? theme.colors.selectedRow : theme.colors.appBar};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.32);
`;

export default AppBarContainer;
