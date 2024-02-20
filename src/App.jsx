import './App.css' //ממרכז 

import Main from './FuncComps/Main';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Grid from '@mui/material/Grid';
import { BrowserRouter } from 'react-router-dom';





function App() {

  return (
    <>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </>
  )
}

export default App
