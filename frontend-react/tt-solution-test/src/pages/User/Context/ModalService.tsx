import { createContext, useContext, useReducer } from "react";

interface ModalState {
  isOpen: boolean;
  idEdit: string;
}

interface ModalPayload {
  idEdit: string;
}

interface ModalAction {
  type: "OPEN_MODAL" | "CLOSE_MODAL";
  payload?: ModalPayload;
}

const initialState: ModalState = {
  isOpen: false,
  idEdit: "",
};

const ModalContext = createContext<{
  state: ModalState;
  dispatch: React.Dispatch<ModalAction>;
}>({ state: initialState, dispatch: () => null });

const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        isOpen: true,
        idEdit: action.payload?.idEdit || "",
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        isOpen: false,
        idEdit: "",
      };
    default:
      return state;
  }
};

interface ModalProviderProps {
  children: React.ReactNode;
}

const ModalProvider: React.FC<ModalProviderProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = (): {
  state: ModalState;
  dispatch: React.Dispatch<ModalAction>;
} => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export { ModalProvider, useModal };
