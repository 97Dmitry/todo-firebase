import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import styled from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({ name, ...rest }) => {
  return <Root {...rest}>{name}</Root>;
};

const Root = styled.button`
  background: #448aff;
  padding: 8px;
  color: white;
  border-radius: 8px;

  &:disabled {
    background: #7c8694;
  }
`;

export default Button;
