import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col h-screen border-green-500 p-0 m-0">
        <div className="flex justify-between items-center w-full p-4 bg-indigo-100 border-b-2 border-indigo-100">
          <span className="text-xl font-bold">Trello Clone</span>
          <div className="flex gap-4">
            <button className="text-black border-2 border-blue-500 hover:bg-blue-700 text-sm font-bold py-2 px-4 rounded">
              Home
            </button>
            <button className="text-black border-2 border-green-500 hover:bg-green-700 text-sm font-bold py-2 px-4 rounded">
              About
            </button>
            <button className="text-black border-2 border-red-500 hover:bg-red-700 text-sm font-bold py-2 px-4 rounded">
              Contact
            </button>
          </div>
        </div>
        <div className="bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center w-full h-full">
          <Board />
        </div>
      </div>
    </>
  );
}

function Board() {
  return (
    <div className="bg-gray-200 border-2 border-indigo-200 flex items-start justify-center w-full h-full flex-row gap-4 m-4 p-4">
      <CardColumn />
      <CardColumn />
      <CardColumn />
    </div>
  );
}

function CardColumn() {
  return (
    <div className="bg-indigo-100 border-2 border-indigo-200 flex flex-col items-start justify-center w-80 h-full gap-4 p-4 rounded-xl">
      <Card />
      <Card />
      <Card />
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white border-2 border-indigo-200 flex items-start justify-start rounded-xl w-full py-6">
      <span className="text-black text-md">foobar</span>
    </div>
  );
}

export default App;
