import Header from "./components/Header";
import Board from "./components/Board";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Workspaces from "./components/Workspaces";
import { DataProvider } from './context/DataContext';
import { UserProvider } from './context/UserContext';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <DataProvider>
            <Routes>
              <Route path="/" element={<Header />} />
              <Route path="/home" element={<Home />} />
              <Route path="/board/:id" element={<Board />} />
              <Route path="/login" element={<Login />} />
              <Route path="/workspaces" element={<Workspaces />} />
            </Routes>
          </DataProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
