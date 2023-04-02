import Header from "./components/Header";
import Board from "./components/Board";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Workspaces from "./components/Workspaces";
import { AppProvider } from './context/AppContext';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <AppProvider>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/home" element={<Home />} />
          <Route path="/board/:id" element={<Board />} />
          <Route path="/login" element={<Login />} />
          <Route path="/workspaces" element={<Workspaces />} />
        </Routes>
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
