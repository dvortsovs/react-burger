import React from 'react';
import appStyle from './app.module.css';
import AppHeader from "../app-header/app-header";

function App() {
  return (
    <div className={appStyle.app}>
        <AppHeader />
    </div>


  );
}

export default App;
