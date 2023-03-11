import {ThemeProvider} from 'styled-components';
import './App.css'
import {Button} from "./components/Button";
import {defaultTheme} from "./styles/themes/defaults";
import {GlobalStyle} from "./styles/global";


export function App() {
  return (
      <ThemeProvider theme={defaultTheme}>
        <Button/><Button/><Button/><Button/>
          <GlobalStyle/>

      </ThemeProvider>
  )
}

