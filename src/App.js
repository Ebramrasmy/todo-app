import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavigationBar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import TodoForm from './pages/To-Do';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
        <NavigationBar />
        <Container className="mt-4">
          <Switch>
            <Route path="/login" component={Login} exact/>
            <Route path="/register" component={Register} exact/>
            <Route path="/todo" component={TodoForm} exact/>
            <Route path={"*"} component={NotFound} />
          </Switch>
        </Container>
    </BrowserRouter>
  );
}

export default App;
