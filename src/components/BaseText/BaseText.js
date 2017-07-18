import styled from 'styled-components';

const fontsStyle = name => ({ type, theme }) => {
  if (type && theme.fonts[type][name]) {
    return theme.fonts[type][name];
  }
  return theme.fonts.default[name];
};

export default styled.p`
  font-family: ${fontsStyle('family')};
  text-transform: ${fontsStyle('transform')};
  font-weight: ${fontsStyle('weight')};
  font-size: ${fontsStyle('size')};
  margin: 0;
  color: ${({ theme, color }) => theme.colors[color] || color};
`;
