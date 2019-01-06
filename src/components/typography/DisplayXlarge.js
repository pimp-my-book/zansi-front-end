import styled from "styled-components";

 const DisplayXlarge = styled.h1`
  font-size: 55px;
  line-height: 100%;
  font-weight: 500;
  color: ${props => props.normal ? "var(--bubblegum)" : "var(--linen)"}
`;

export default DisplayXlarge;