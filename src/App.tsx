import React, { useReducer, useEffect } from "react";

// Define types
type Column = {
  id: string;
  title: string;
  cards: Card[];
};

type Card = {
  id: string;
  text: string;
};

type State = {
  columns: Column[];
  modal: {
    isOpen: boolean;
    columnId: string | null;
    cardId: string | null;
  };
};

type Action =
  | { type: "ADD_COLUMN"; payload: string }
  | { type: "ADD_CARD"; payload: { columnId: string; text: string } }
  | {
      type: "UPDATE_CARD";
      payload: { columnId: string; cardId: string; text: string };
    }
  | { type: "OPEN_MODAL"; payload: { columnId: string; cardId: string } }
  | { type: "CLOSE_MODAL" };

// Reducer function
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_COLUMN":
      return {
        ...state,
        columns: [
          ...state.columns,
          { id: Date.now().toString(), title: action.payload, cards: [] },
        ],
      };
    case "ADD_CARD":
      return {
        ...state,
        columns: state.columns.map((column) =>
          column.id === action.payload.columnId
            ? {
                ...column,
                cards: [
                  ...column.cards,
                  { id: Date.now().toString(), text: action.payload.text },
                ],
              }
            : column,
        ),
      };
    case "UPDATE_CARD":
      return {
        ...state,
        columns: state.columns.map((column) =>
          column.id === action.payload.columnId
            ? {
                ...column,
                cards: column.cards.map((card) =>
                  card.id === action.payload.cardId
                    ? { ...card, text: action.payload.text }
                    : card,
                ),
              }
            : column,
        ),
      };
    case "OPEN_MODAL":
      return {
        ...state,
        modal: {
          isOpen: true,
          columnId: action.payload.columnId,
          cardId: action.payload.cardId,
        },
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        modal: {
          isOpen: false,
          columnId: null,
          cardId: null,
        },
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    columns: [
      { id: "1", title: "To Do", cards: [] },
      { id: "2", title: "In Progress", cards: [] },
      { id: "3", title: "Done", cards: [] },
    ],
    modal: {
      isOpen: false,
      columnId: null,
      cardId: null,
    },
  });

  return (
    <>
      <div className="m-0 flex h-screen flex-col border-green-500 p-0">
        <Header />
        <div className="flex h-full w-full items-center justify-center border-2 border-indigo-200 bg-indigo-100">
          <Board columns={state.columns} dispatch={dispatch} />
        </div>
      </div>
      {state.modal.isOpen && (
        <CardModal
          card={state.columns
            .find((col) => col.id === state.modal.columnId)
            ?.cards.find((card) => card.id === state.modal.cardId)}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
          dispatch={dispatch}
          columnId={state.modal.columnId!}
        />
      )}
    </>
  );
}

function Board({
  columns,
  dispatch,
}: {
  columns: Column[];
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <div className="flex h-full w-full flex-row items-start justify-start gap-4 bg-gray-200 p-4">
      {columns.map((column) => (
        <CardColumn key={column.id} column={column} dispatch={dispatch} />
      ))}
      <NewColumn dispatch={dispatch} />
    </div>
  );
}

function CardColumn({
  column,
  dispatch,
}: {
  column: Column;
  dispatch: React.Dispatch<Action>;
}) {
  const handleAddCard = (text: string) => {
    dispatch({ type: "ADD_CARD", payload: { columnId: column.id, text } });
  };

  return (
    <div className="flex h-full w-80 flex-col items-start justify-start gap-2 rounded-xl border-2 border-indigo-200 bg-indigo-100 p-2">
      <span className="text-md p-2 font-bold text-black">{column.title}</span>
      {column.cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          columnId={column.id}
          dispatch={dispatch}
        />
      ))}
      <AddCardInput onAddCard={handleAddCard} />
    </div>
  );
}

function Card({
  card,
  columnId,
  dispatch,
}: {
  card: Card;
  columnId: string;
  dispatch: React.Dispatch<Action>;
}) {
  const handleClick = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { columnId, cardId: card.id },
    });
  };

  return (
    <div
      className="flex w-full cursor-pointer items-start justify-start rounded-xl border-2 border-indigo-200 bg-gray-200"
      onClick={handleClick}
    >
      <div className="flex w-full flex-col items-start justify-start rounded-xl bg-white p-2">
        <span className="text-md text-black">{card.text}</span>
      </div>
    </div>
  );
}

function CardModal({
  card,
  onClose,
  dispatch,
  columnId,
}: {
  card: Card | undefined;
  onClose: () => void;
  dispatch: React.Dispatch<Action>;
  columnId: string;
}) {
  if (!card) return null;

  const handleUpdate = (text: string) => {
    dispatch({
      type: "UPDATE_CARD",
      payload: { columnId, cardId: card.id, text },
    });
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Card Details</h2>
        <textarea
          className="mb-4 w-full rounded border p-2"
          value={card.text}
          onChange={(e) => handleUpdate(e.target.value)}
          rows={4}
        />
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

function NewColumn({ dispatch }: { dispatch: React.Dispatch<Action> }) {
  const handleAddColumn = () => {
    const title = prompt("Enter column title:");
    if (title) {
      dispatch({ type: "ADD_COLUMN", payload: title });
    }
  };

  return (
    <div
      className="flex w-80 cursor-pointer flex-col items-start justify-start gap-2 rounded-xl border-2 border-indigo-200 bg-indigo-100 p-2"
      onClick={handleAddColumn}
    >
      <span className="text-md p-2 font-bold text-black">+ Add Column</span>
    </div>
  );
}

function Header() {
  return (
    <div className="flex w-full items-center justify-between border-b-2 border-indigo-100 bg-indigo-100 p-4">
      <span className="text-xl font-bold">Trello Clone</span>
      <div className="flex gap-4">
        <button className="rounded px-4 py-2 text-sm font-bold text-black hover:bg-gray-400">
          Home
        </button>
        <button className="rounded px-4 py-2 text-sm font-bold text-black hover:bg-gray-400">
          About
        </button>
        <button className="rounded px-4 py-2 text-sm font-bold text-black hover:bg-gray-400">
          Contact
        </button>
      </div>
    </div>
  );
}

function AddCardInput({ onAddCard }: { onAddCard: (text: string) => void }) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      onAddCard(e.currentTarget.value.trim());
      e.currentTarget.value = "";
    }
  };

  return (
    <input
      type="text"
      placeholder="+ Add Item"
      className="text-md text-black-500 w-full rounded-xl p-2 hover:bg-gray-100"
      onKeyPress={handleKeyPress}
    />
  );
}

export default App;
