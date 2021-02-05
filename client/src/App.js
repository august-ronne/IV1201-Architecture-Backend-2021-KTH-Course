import { BrowserRouter as Router, Route } from "react-router-dom";

import { Home, Register, Login, Navbar } from "./Components/index";

function App() {
  return (
    <Router>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
    </Router>
  );
}

export default App;
