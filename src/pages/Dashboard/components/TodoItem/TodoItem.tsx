import styled from "styled-components";
import { FC, useState } from "react";
import { TodoEntity } from "types/entities";
import { observer } from "mobx-react";
import useStore from "hooks/useStore";
import { Checkbox, EditTodoModal } from "components";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "constants/routes";
import dayjs from "dayjs";

interface TodoItemProps {
  todo: TodoEntity;
}

/**
 * Компонент одной задачи.
 *
 * @component
 * @example
 * const todo = {
 *   id: number;
 *   text: string;
 *   description: string;
 *   created: Timestamp;
 *   completionDate: Timestamp;
 *   completed: boolean;
 *   filePath: string;
 *   fileName: string;
 * }
 * return (
 *   <TodoItem todo={todo} />
 * )
 */
const TodoItem: FC<TodoItemProps> = observer(({ todo }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { todoStore } = useStore();
  const navigate = useNavigate();

  const isLoading = todoStore.isLoading;

  const isTaskExpired =
    todo.completionDate?.seconds && todo.completionDate.seconds < dayjs().unix();

  const handleDeleteTodo = () => {
    todoStore.deleteTodo(todo.id);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const onNavigate = () => {
    navigate(AppRoutes.TASK(todo.id));
  };

  const handelCompletedChange = () => {
    todoStore.updateTdoById({
      id: todo.id,
      completed: !todo.completed,
    });
  };

  return (
    <Root>
      <Name onClick={onNavigate} $isCompleted={todo.completed} $isTaskExpired={!!isTaskExpired}>
        {todo.text}
      </Name>
      <Checkbox
        label="Completed"
        labelId={todo.id}
        completed={todo.completed}
        disabled={isLoading || !!isTaskExpired}
        onChange={handelCompletedChange}
      />
      <EditButton onClick={handleOpenModal}>⚙️</EditButton>
      <DeleteButton onClick={handleDeleteTodo}>🗑️</DeleteButton>
      {isOpenModal && (
        <EditTodoModal
          isOpen={isOpenModal}
          onClose={handleCloseModal}
          title="Edit todo"
          buttonText="Edit"
          action="update"
          todo={todo}
        />
      )}
    </Root>
  );
});

const Root = styled.div`
  width: 100%;
  padding: 6px;
  display: flex;
  align-items: center;
  transition: 0.3s;

  &:hover {
    background: rgba(17, 14, 14, 0.1);
  }
`;

const DeleteButton = styled.button`
  width: 30px;
`;

const EditButton = styled.button`
  width: 30px;
  margin-right: 20px;
`;

const Name = styled.div<{ $isCompleted: boolean; $isTaskExpired: boolean }>`
  margin-right: auto;
  cursor: pointer;
  text-decoration: ${({ $isCompleted, $isTaskExpired }) =>
    $isCompleted || $isTaskExpired ? "line-through" : "none"};
  ${({ $isTaskExpired }) => ($isTaskExpired ? "color: red;" : "")}
`;

export default TodoItem;
