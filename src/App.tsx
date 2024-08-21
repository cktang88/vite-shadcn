function App() {
  return (
    <>
      <div className="m-0 flex h-screen flex-col border-green-500 p-0">
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
        <div className="flex h-full w-full items-center justify-center border-2 border-indigo-200 bg-indigo-100">
          <Board />
        </div>
      </div>
    </>
  );
}

function Board() {
  return (
    <div className="flex h-full w-full flex-row items-start justify-start gap-4 bg-gray-200 p-4">
      <CardColumn title="To Do" />
      <CardColumn title="In Progress" />
      <CardColumn title="Done" />
      <NewColumn />
    </div>
  );
}

function CardColumn({ title }: { title: string }) {
  return (
    <div className="flex h-full w-80 flex-col items-start justify-start gap-2 rounded-xl border-2 border-indigo-200 bg-indigo-100 p-2">
      <span className="text-md p-2 font-bold text-black">{title}</span>
      <Card text="some random text" />
      <Card text="a thing that needs to be done, but a really long text example" />
      <Card text="what is this" />
      <input
        type="text"
        placeholder="+ Add Item"
        className="text-md text-black-500 w-full rounded-xl p-2 hover:bg-gray-100"
      />
    </div>
  );
}

function Card({ text }: { text: string }) {
  return (
    <div className="flex w-full items-start justify-start rounded-xl border-2 border-indigo-200 bg-gray-200">
      <div className="flex w-full flex-col items-start justify-start rounded-xl bg-white p-2">
        <span className="text-md text-black">{text}</span>
      </div>
    </div>
  );
}

function NewColumn() {
  return (
    <div className="flex w-80 flex-col items-start justify-start gap-2 rounded-xl border-2 border-indigo-200 bg-indigo-100 p-2">
      <span className="text-md p-2 font-bold text-black">+ Add Column</span>
    </div>
  );
}

export default App;
