import AppRouting from "routes/AppRouting";
import { GlobalStyle } from "./styles/general/global";
import "./firebase";
import { useEffect } from "react";
import useStore from "./hooks/useStore";
import { observer } from "mobx-react";

const App = observer(() => {
  const { todoStore } = useStore();

  useEffect(() => {
    todoStore.getTodos();
  }, []);

  return (
    <>
      <GlobalStyle />
      <AppRouting />
    </>
  );
});

export default App;
