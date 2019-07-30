import React from 'react';
import {Switch, Route, HashRouter} from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Splash from './components/splash/splash';

function App() {
  return (
    <HashRouter>
      <main id="app-container">
        <Navbar/>
        <Switch>
          <Route path="/" component={Splash}></Route>
        </Switch>
      </main>
    </HashRouter>
  );
}

export default App;
