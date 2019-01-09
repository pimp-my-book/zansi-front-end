import styled from "styled-components";

 const Textbody = styled.p`
  font-size: 15px;
  font-weight: 500;
  color:${props => props.main ? '#1b335f' : 'var(--rasin-black)'};
`;

export default Textbody;