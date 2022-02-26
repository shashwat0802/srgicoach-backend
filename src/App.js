import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Mails from './pages/Mails';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Mails} />
          {/* end redirect route on not found */}
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
