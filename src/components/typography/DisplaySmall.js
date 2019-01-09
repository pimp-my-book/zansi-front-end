import styled from "styled-components";

 const DisplaySmall = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #1b335f;
  font-family: ${props => props.main ? 'Paytone One' : 'Poppins'};
`;

export default DisplaySmall;