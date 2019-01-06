import { Navbar} from "react-bootstrap";
import styled from "styled-components";

const NavToggler = styled(Navbar.Toggle)`
  &&& {
      border:none;
     .navbar-toggler-icon {
         background-image:none;
     }
     color: var(--white);
  }
`;

export default NavToggler;