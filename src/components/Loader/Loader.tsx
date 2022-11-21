import styled, { keyframes } from "styled-components";

const Loader = () => {
  return (
    <Root>
      <StyledLoader />
    </Root>
  );
};

const animation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Root = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;

  transform: translate(-50%, -50%);
`;

const StyledLoader = styled.div`
  width: 60px;
  height: 60px;

  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 8px solid blue;
  border-right: 8px solid green;
  border-bottom: 8px solid red;

  animation: ${animation} 2s linear infinite;
`;

export default Loader;
