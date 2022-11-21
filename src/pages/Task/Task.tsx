import { useParams } from "react-router-dom";
import useStore from "hooks/useStore";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Card, Loader, ProgressBar } from "components";
import dayjs from "dayjs";
import { fileDownloader } from "../../utils/fileDownloader";

const Task = observer(() => {
  const { id } = useParams();
  const { todoStore } = useStore();
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  const todo = todoStore.currentTodo;

  useEffect(() => {
    if (id) todoStore.getTodoById(id);
  }, [id]);

  const handleDownloadFile = () => {
    todo?.filePath &&
      todoStore.getTodoFile(todo.filePath).then((data) => {
        fileDownloader(data!, todo.fileName!, setDownloadProgress);
      });
  };

  if (!id) {
    return <>Task not found</>;
  }

  return (
    <Root>
      <Card title={todo?.text || ""}>
        {todoStore.isLoading ? (
          <Loader />
        ) : (
          <>
            <FieldWrapper>
              <FieldLabel>Completion date</FieldLabel>
              <Field>
                {todo?.completionDate
                  ? dayjs(todo.completionDate.seconds).format("DD/MM/YYYY")
                  : "-"}
              </Field>
            </FieldWrapper>
            <FieldWrapper>
              <FieldLabel>Heading</FieldLabel>
              <Field>{todo?.text ? todo?.text : "-"}</Field>
            </FieldWrapper>
            <FieldWrapper>
              <FieldLabel>Status</FieldLabel>
              <Field>{todo?.completed ? "Is completed" : "Is not completed"}</Field>
            </FieldWrapper>
            <FieldWrapper>
              <FieldLabel>Description</FieldLabel>
              <Field>{todo?.description ? todo?.description : "-"}</Field>
            </FieldWrapper>
            <FieldWrapper>
              <FieldLabel>File</FieldLabel>
              <File $isNotEmpty={!!todo?.filePath} onClick={handleDownloadFile}>
                {todo?.fileName ? todo?.fileName : "-"}
              </File>
              {downloadProgress ? <ProgressBar id={id} value={downloadProgress} /> : <></>}
            </FieldWrapper>
          </>
        )}
      </Card>
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

const FieldWrapper = styled.div`
  padding: 10px;
`;

const FieldLabel = styled.div`
  font-size: 18px;
`;

const Field = styled.div`
  text-align: center;
`;

const File = styled.div<{ $isNotEmpty: boolean }>`
  text-align: center;
  cursor: ${({ $isNotEmpty }) => ($isNotEmpty ? "pointer" : "default")};
  text-decoration: ${({ $isNotEmpty }) => ($isNotEmpty ? "underline" : "none")};
`;

export default Task;
