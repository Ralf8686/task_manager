import styled from 'styled-components';

export default styled.button`
  border: none;
  padding: 0;
  width: ${({ theme }) => theme.sizes.navBar};
  height: ${({ theme }) => theme.sizes.navBar};
  background-color: #000000;
`;
