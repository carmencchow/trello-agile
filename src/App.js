import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import Starred from "./components/Starred";
import Board from "./components/Board";
import Login from "./components/Login";
import Register from "./components/Register";
import Workspaces from "./components/Workspaces";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <DataProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/board/:id" element={<Board />} />
            <Route path="/workspaces" element={<Workspaces />} />
            <Route path="/starred" element={<Starred />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </DataProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
