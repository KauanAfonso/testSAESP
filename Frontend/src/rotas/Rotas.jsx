import {Route, Routes} from 'react-router';
import { Inicial } from '../paginas/Inicial';
import  {Quadro} from '../Componentes/Quadro';
import { CadUsuario } from '../paginas/CadUsuario';
import { CadTarefa} from '../paginas/CadTarefa';
import { EditarTarefa } from '../paginas/EditarTarefa';

export function Rotas(){
    return(
        <Routes>
            <Route path='/' element={<Inicial/>}>
             
             <Route index element={<Quadro/>}/>
             <Route path='cadUsuario' element={<CadUsuario/>}/>
             <Route path='cadTarefa' element={<CadTarefa/>}/>
             <Route path = 'EditarTarefa/:id' element={<EditarTarefa/>}/>

            </Route>
        </Routes>
    )
}