import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from "./router/Home";
import Login from "./router/Login";
import { AuthContextProvider } from "./firebase/FirebaseContext";
import {NeedLoggedInRoute, NeedLoggedOutRoute} from "./firebase/FirebaseRoutes";

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <div>
          <Route exact path="/"><Redirect to="/home" /></Route>
          <NeedLoggedInRoute exact path="/home" redirect="/login" component={Home} />
          <NeedLoggedOutRoute exact path="/login" redirect="/home" component={Login} />
        </div>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
