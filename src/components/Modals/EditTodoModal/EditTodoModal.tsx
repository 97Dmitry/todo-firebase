import { BaseModal, Button, Input } from "components";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { BaseModalProps } from "../BaseModal/BaseModal";
import styled from "styled-components";
import { datePattern } from "utils/patterns";
import useStore from "hooks/useStore";
import { TodoEntity } from "types/entities";
import { observer } from "mobx-react";

interface EditTodoModalProps extends BaseModalProps {
  buttonText: string;
  action: "create" | "update";
  todo?: TodoEntity;
}

/**
 * Компонент модальное окно для редактирования или создания задачи.
 *
 * @component
 * @example
 * const onClose = () => {};
 * const isOpen = true;
 * const title = string;
 * const buttonText = string
 * const action = "create" | "update"
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
 *   <EditTodoModal buttonText={buttonText} action={action} todo={todo} onClose={onClose} isOpen={isOpen} title={title} />
 * )
 */
const EditTodoModal: FC<EditTodoModalProps> = observer(
  ({ isOpen, onClose, title, buttonText, action, todo }) => {
    const [text, setText] = useState<string>(todo?.text || "");
    const [description, setDescription] = useState<string>(todo?.description || "");
    const [completionDate, setCompletionDate] = useState<string>();
    const [file, setFile] = useState<{ file: ArrayBuffer | string; fileName: string }>();
    const { todoStore } = useStore();

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (action === "create") {
        todoStore
          .createTodo({
            text,
            description,
            completionDate: completionDate ? new Date(completionDate) : undefined,
            file: file?.file as ArrayBuffer,
            fileName: file?.fileName,
          })
          .then(() => {
            onClose();
          });
      } else {
        todoStore
          .updateTdoById({
            id: todo!.id,
            text,
            description,
            completionDate: completionDate ? new Date(completionDate) : undefined,
            file: file?.file as ArrayBuffer,
            fileName: file?.fileName,
          })
          .then(() => {
            onClose();
          });
      }
    };

    const handleChangeFileInput = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target?.files?.[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = () => {
          if (reader.result) setFile({ file: reader.result, fileName: file.name });
        };
      }
    };

    if (action === "update" && !todo) {
      return <>EditTodoModal mush has todo item</>;
    }

    return (
      <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
        <Form onSubmit={onSubmit}>
          <InputWrapper>
            <InputTitle>Todo heading</InputTitle>
            <StyledInput
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Heading"
            />
          </InputWrapper>
          <InputWrapper>
            <InputTitle>Todo description</InputTitle>
            <StyledInput
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Description"
            />
          </InputWrapper>
          <InputWrapper>
            <InputTitle>Todo completion date</InputTitle>
            <StyledInput
              value={completionDate}
              onChange={(event) => setCompletionDate(event.target.value)}
              placeholder="mm.dd.yyyy"
              pattern={datePattern}
            />
          </InputWrapper>
          <InputWrapper>
            <InputTitle>Todo file</InputTitle>
            <StyledInput type="file" onChange={handleChangeFileInput} />
          </InputWrapper>

          <Button type="submit" name={buttonText} disabled={todoStore.isLoading} />
        </Form>
      </BaseModal>
    );
  },
);

const Form = styled.form``;

const InputTitle = styled.div`
  text-align: center;
  font-size: 18px;
`;

const StyledInput = styled(Input)``;

const InputWrapper = styled.div`
  margin-bottom: 18px;
`;

export default EditTodoModal;
