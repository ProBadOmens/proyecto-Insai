
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import MainLayout from './components/Layouts/MainLayout';
import Error from './pages/Error/Error';
import Login from './pages/Login/Login';
import Cargo from './pages/Cargo/Cargo';
import Home from './pages/Home/Home';
import Personas from './pages/Persona/Persona';
import Usuarios from './pages/Usuario/Usuario';
import Animal from './pages/Animal/Animales';
import Vegetal from './pages/Vegetal/Vegetales';
import Chart from './pages/Chart/Chart'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta para Login sin Header, Menu y Footer */}
        <Route path="/Login" element={<Login />} />

        {/* Rutas con el layout principal */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>}/>
        <Route path="/Cargo" element={<MainLayout><Cargo /></MainLayout>}/>
        <Route path="/Personas" element={<MainLayout><Personas /></MainLayout>}/>
        <Route path="/Usuario" element={<MainLayout><Usuarios /></MainLayout>}/>
        <Route path="/Animal" element={<MainLayout><Animal /></MainLayout>}/>
        <Route path="/Vegetal" element={<MainLayout><Vegetal /></MainLayout>}/>
        <Route path="/Chart" element={<MainLayout><Chart /></MainLayout>}/>
        <Route path="*" element={<MainLayout><Error /></MainLayout>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
  

