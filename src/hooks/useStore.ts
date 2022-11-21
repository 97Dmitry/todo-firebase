import { StoreContext } from "context/store.context";
import { useContext } from "react";

/**
 *  Хук использования стора
 */
export default function useStore() {
  return useContext(StoreContext);
}
