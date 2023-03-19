import { useEffect } from "react";
import Header from "./components/Header";
import { Board } from "./components/Board";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "./store/thunks/fetchList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);

  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/lists" element={<Board lists={lists} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
