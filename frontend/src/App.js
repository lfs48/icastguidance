import React from 'react';
import {Switch, Route, HashRouter} from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Splash from './components/splash/splash';
import Modal from './components/modal/modal';
import { Provider } from 'react-redux';

function App({store}) {
  return (
    <Provider store={store}>
      <HashRouter>
        <Modal/>
        <main id="app-container">
          <Navbar/>
          <Switch>
            <Route path="/" component={Splash}></Route>
          </Switch>
        </main>
      </HashRouter>
    </Provider>
  );
}

export default App;
