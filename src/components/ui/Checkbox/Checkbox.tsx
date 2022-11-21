import styled from "styled-components";
import { FC, InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelId: string;
  completed: boolean;
}

const Checkbox: FC<CheckboxProps> = ({ label, labelId, completed, ...rest }) => {
  return (
    <Root>
      <CheckboxInput checked={completed} type="checkbox" id={labelId} {...rest} />
      <Label htmlFor={labelId}>{label}</Label>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 10px;
`;

const CheckboxInput = styled.input`
  width: 20px;
  height: 20px;
`;

const Label = styled.label`
  font-size: 16px;
`;

export default Checkbox;
