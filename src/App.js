import "./App.css";
import Header from "./components/Header";
import TrelloList from "./components/TrelloList";

function App() {
  return (
    <div className="App">
      <Header />
      <TrelloList title={'To Do'} />
    </div>
  );
}

export default App;
