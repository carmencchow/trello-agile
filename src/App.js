import { useEffect } from "react";
import Header from "./components/Header";
import { Board } from "./components/Board";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./store/thunks/fetchList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Workspaces from "./components/Workspaces";
import { CircularProgress } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const { lists, boards, cards, status, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

console.log(cards, 'cards app.js');

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

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
