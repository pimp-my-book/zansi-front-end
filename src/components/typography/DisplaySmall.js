import styled from "styled-components";

 const DisplaySmall = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: ${props => props.normal ? "var(--white)" : "var(--bubblegum)"};
`;

export default DisplaySmall;