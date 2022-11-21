import { Button, Card, EditTodoModal, Loader } from "components";
import styled from "styled-components";
import { useState } from "react";
import useStore from "hooks/useStore";
import { observer } from "mobx-react";
import TodoItem from "./components/TodoItem/TodoItem";

const Dashboard = observer(() => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { todoStore } = useStore();

  const todos = todoStore.todos;

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  return (
    <Root>
      <Card title="ToDo List App">
        {todoStore.isLoading ? (
          <Loader />
        ) : (
          <>
            <ButtonWrapper>
              <Button type="submit" onClick={handleOpenModal} name="Add new task" />
            </ButtonWrapper>
            <ToDoList>
              {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </ToDoList>
          </>
        )}
      </Card>
      {isOpenModal && (
        <EditTodoModal
          onClose={handleCloseModal}
          isOpen={isOpenModal}
          title="Create new task"
          buttonText="Create"
          action="create"
        />
      )}
    </Root>
  );
});

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
`;

const ToDoList = styled.div`
  flex: 1 0 auto;
  padding: 0 80px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px;
`;

export default Dashboard;
