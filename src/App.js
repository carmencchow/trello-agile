import { useEffect } from "react";
import Header from "./components/Header";
import Board from "./components/Board";
import { useDispatch } from "react-redux";
import { fetchData } from "./store/thunks/fetchList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Workspaces from "./components/Workspaces";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  const dispatch = useDispatch();
  // const lists = useSelector((state) => state.data.lists);
  // const boards = useSelector((state) => state.data.boards);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/lists" element={<Board lists={lists} />} /> */}
          <Route path="/board/:id" element={<Provider store={store}><Board /></Provider>} />
          <Route path="/login" element={<Login />} />
          <Route path="/workspaces" element={<Workspaces />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
