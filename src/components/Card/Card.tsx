import styled from "styled-components";
import { FC, PropsWithChildren } from "react";

interface CardProps {
  title: string;
}

/**
 * Компонент карта контейнер.
 *
 * @component
 * @example
 * const title = string
 * const children = ReactNode
 * return (
 *   <Card title={title}>{children}</Card>
 * )
 */
const Card: FC<PropsWithChildren<CardProps>> = ({ title, children }) => {
  return (
    <Root>
      <Header>{title}</Header>
      {children}
    </Root>
  );
};

const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 600px;
  height: 900px;

  border-radius: 15px;
  background: #fff;
  box-shadow: 0 10px 25px #999;

  overflow: hidden;
`;

const Header = styled.h1`
  background: #448aff;
  padding: 12px;
  height: 52px;

  text-align: center;
  color: white;
`;

export default Card;
