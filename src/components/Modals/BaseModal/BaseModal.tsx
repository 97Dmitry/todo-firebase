import styled from "styled-components";
import { FC, PropsWithChildren, useEffect, useRef } from "react";
import useClickOutside from "hooks/useClickOutside";

export interface BaseModalProps {
  onClose: () => void;
  isOpen: boolean;
  title: string;
}

const BaseModal: FC<PropsWithChildren<BaseModalProps>> = ({ onClose, isOpen, children, title }) => {
  const modalRef = useRef(null);

  useClickOutside(modalRef, onClose);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("keydown", close);
    };
  });

  return (
    <Root>
      <StyledModal ref={modalRef}>
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={onClose}>&#10006;</CloseButton>
        </Header>
        <Content>{children}</Content>
      </StyledModal>
    </Root>
  );
};

const Root = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  height: 100%;
  background: rgba(17, 14, 14, 0.2);
`;

const StyledModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;

  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  right: -10px;
  top: -16px;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const Title = styled.div``;

const Content = styled.div``;

export default BaseModal;
