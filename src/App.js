import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from './context/DataContext';
import { UserProvider } from './context/UserContext';
import Board from "./components/Board";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Workspaces from "./components/Workspaces";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <DataProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/board/:id" element={<Board />} />
              <Route path="/workspaces" element={<Workspaces />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </DataProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
