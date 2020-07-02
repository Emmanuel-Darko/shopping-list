import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Provider } from 'react-redux';
import { Container } from 'reactstrap';
import store from './store';
import { loadUser } from './actions/authActions';

import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/itemModal';
import Calculator from './components/Calculator';

function App() {

  // Component Did Mount
  useEffect(() => {
    store.dispatch(loadUser());
  })

  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <ItemModal />
          <ShoppingList />
          <Calculator />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
