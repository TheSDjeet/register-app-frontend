//import "./App.css";
import { Switch, Route } from "react-router-dom";
import FrontView from "./Views/FrontView";
import List from "./Views/List";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <FrontView />
        </Route>
        <Route exact path="/list">
          <List />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
