import { useEffect } from "react";
import Header from "./components/Header";
import { Board } from "./components/Board";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "./store/thunks/fetchList";

function App() {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);

  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Board lists={lists} />
    </div>
  );
}

export default App;
