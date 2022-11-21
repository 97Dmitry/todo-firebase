import React, { FC } from "react";
import styled from "styled-components";

const ProgressBar: FC<ProgressBarProps> = ({ id, value }) => {
  return (
    <Root>
      <label htmlFor={id}>Downloading:</label>
      <progress id={id} max="100" value={value}>
        {value}%
      </progress>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface ProgressBarProps {
  id: string;
  value: number;
}

export default ProgressBar;
