import styled from "styled-components";

 const DisplayXlarge = styled.h1`
  font-size: 35px;
  line-height: 100%;
  font-weight: 500;
  color: ${props => props.normal ? "var(--medium-sky-blue)" : "var(--linen)"}
`;

export default DisplayXlarge;