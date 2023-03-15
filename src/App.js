import "./App.css";
import Header from "./components/Header";
import TrelloList from "./components/TrelloList";

function App() {
  return (
    <div className="App">
      <Header />
      <TrelloList title={'To Do'} />
      <header className="App-header">
        <h1>Trello Clone</h1>
        <h2>Schema Branch</h2>
        <h1 className="css-test">Trello Clone</h1>
      </header>
    </div>
  );
}

export default App;
