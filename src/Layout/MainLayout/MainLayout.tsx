import { Outlet } from "react-router-dom";
import styled from "styled-components";

const MainLayout = () => {
  return (
    <Main>
      <Outlet />
    </Main>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  background: #cecece;
`;

export default MainLayout;
