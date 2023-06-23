import UserComponent from "./component/UserComponent";
import './App.css'
const App = () => {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">User Management System</h1>
        </header>
        <UserComponent></UserComponent>
      </div>
    </>
  );
};

export default App;
