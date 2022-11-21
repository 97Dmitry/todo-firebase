import styled from "styled-components";
import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = ({ ...rest }) => {
  return <Root {...rest} />;
};

const Root = styled.input``;

export default Input;
