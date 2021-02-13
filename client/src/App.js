import { BrowserRouter as Router, Route } from "react-router-dom";

import { Home, Register, Login, Navbar, UsersOnly } from "./Components/index";
import { PrivateRoute, PublicRoute } from "./HoCs/index";

function App() {
    return (
        <Router>
            <Navbar />
            <Route exact path="/" component={Home} />
            <PublicRoute exact path="/register" component={Register} />
            <PublicRoute exact path="/login" component={Login} />
            <PrivateRoute exact path="/usersonly" component={UsersOnly} />
        </Router>
    );
}

export default App;
