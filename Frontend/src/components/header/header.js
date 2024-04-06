import styled from "styled-components";
import { Logo, ControlPanel } from "./components";

const Descryption = styled.div`
  margin-right: 90px;
  padding-right: 90px;
  font-size: 18px;
  font-weight: 400;
  font-style: italic;

`;

const HeaderContainer = ({ className }) => (
  <header className={className}>
    <Logo />
    <Descryption>
      Web Technology <br/> Coding <br/> Development <br/>
    </Descryption>
    <ControlPanel />
  </header>
);

export const Header = styled(HeaderContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  height: 120px;
  width: 1000px;
  padding: 20px 40px;
  z-index: 10;
  background-color: #fff;
  box-shadow: 0px 19px 58px 0px rgba(34, 60, 80, 0.44);
    0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 15px 15px;
`;

export default Header;
