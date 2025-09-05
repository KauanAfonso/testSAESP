import './Style/main.scss';
import { Inicial } from './paginas/Inicial';
import {BrowserRouter} from 'react-router';
import { Rotas } from './rotas/Rotas';

function App() {
  
  return (
    <BrowserRouter>
      <Rotas/>
    </BrowserRouter>
  )
}

export default App
