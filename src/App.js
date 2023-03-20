import { useEffect } from "react";
import Header from "./components/Header";
import { Board } from "./components/Board";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "./store/thunks/fetchList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Workspaces from "./components/Workspaces";

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
          <Route path="/home" element={<Home />} />
          <Route path="/lists" element={<Board lists={lists} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/workspaces" element={<Workspaces />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
