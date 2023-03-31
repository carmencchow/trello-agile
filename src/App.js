import Header from "./components/Header";
import Board from "./components/Board";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Workspaces from "./components/Workspaces";
import { ColorProvider } from './context/ColorContext';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <ColorProvider>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/home" element={<Home />} />
          <Route path="/board/:id" element={<Board />} />
          <Route path="/login" element={<Login />} />
          <Route path="/workspaces" element={<Workspaces />} />
        </Routes>
        </ColorProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
