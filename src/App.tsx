function App() {
  return (
    <>
      <div className="m-0 flex h-screen flex-col border-green-500 p-0">
        <div className="flex w-full items-center justify-between border-b-2 border-indigo-100 bg-indigo-100 p-4">
          <span className="text-xl font-bold">Trello Clone</span>
          <div className="flex gap-4">
            <button className="rounded border-2 border-blue-500 px-4 py-2 text-sm font-bold text-black hover:bg-blue-700">
              Home
            </button>
            <button className="rounded border-2 border-green-500 px-4 py-2 text-sm font-bold text-black hover:bg-green-700">
              About
            </button>
            <button className="rounded border-2 border-red-500 px-4 py-2 text-sm font-bold text-black hover:bg-red-700">
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
    <div className="m-4 flex h-full w-full flex-row items-start justify-start gap-4 border-2 border-indigo-200 bg-gray-200 p-4">
      <CardColumn />
      <CardColumn />
      <CardColumn />
    </div>
  );
}

function CardColumn() {
  return (
    <div className="flex h-full w-80 flex-col items-start justify-start gap-4 rounded-xl border-2 border-indigo-200 bg-indigo-100 p-4">
      <Card />
      <Card />
      <Card />
    </div>
  );
}

function Card() {
  return (
    <div className="flex w-full items-start justify-start rounded-xl border-2 border-indigo-200 bg-gray-200">
      <div className="flex w-full flex-col items-start justify-start rounded-xl bg-white p-2">
        <span className="text-md font-bold text-black">Title</span>
        <span className="text-md text-black">foobar</span>
        <div className="text-md text-gray-500">+ Add Item</div>
      </div>
    </div>
  );
}

export default App;
