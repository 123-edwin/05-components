import React, { useState } from 'react';
import PlatilloForm from './PlatilloComponent/PlatilloForm';
import PlatillosList from './PlatilloComponent/PlatillosList'; 
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [platillos, setPlatillos] = useState([]);
  const [editPlatilloId, setEditPlatilloId] = useState(null);
  const [orden, setOrden] = useState('nombre'); // Estado para controlar el orden
  const [busqueda, setBusqueda] = useState(''); // Estado para el término de búsqueda

  const handleSearchChange = (event) => {
    setBusqueda(event.target.value); // Captura el término de búsqueda
  };

  const handleSavePlatillo = (nuevoPlatillo) => {
    if (editPlatilloId !== null) { 
      const updatedPlatillos = platillos.map(platillo => {
        if (platillo.id === editPlatilloId) {
          return nuevoPlatillo;
        }
        return platillo;
      });
      setPlatillos(updatedPlatillos);
      setEditPlatilloId(null); 
    } else {
      setPlatillos([...platillos, nuevoPlatillo]);
    }
  };

  const handleCancelEdit = () => {
    setEditPlatilloId(null);
  };

  const handleEditPlatillo = (id) => {
    setEditPlatilloId(id);
  };

  const handleDeletePlatillo = (id) => {
    const updatedPlatillos = platillos.filter(platillo => platillo.id !== id); 
    setPlatillos(updatedPlatillos);
  };

  const handleOrdenChange = (event) => {
    setOrden(event.target.value); // Actualiza el estado del orden al valor seleccionado
  };

  return (
    <div className="contenedorPrincipal">
      <div className="izquierda">
        <h1>Gestión de Platillos</h1>
        <PlatilloForm onSave={handleSavePlatillo} onCancel={handleCancelEdit} platillo={editPlatilloId !== null ? platillos.find(platillo => platillo.id === editPlatilloId) : null} />
      </div>
      <div className="derecha">
        <div>
      <input style={{marginTop:'1rem' ,width:'300px', backgroundColor:'rgba(0, 0, 0, 0)', border:'2px solid black', fontFamily:'cursive'}} class="form-control" type="text" value={busqueda} onChange={handleSearchChange} placeholder="Buscar" />
        <select class="form-select" value={orden} onChange={handleOrdenChange} style={{marginBottom: '15px', width:'200px', backgroundColor:'rgba(0, 0, 0, 0)', border:'2px solid black'}}>
          <option value="nombre">Ordenar por nombre</option>
          <option value="picor">Ordenar por picor</option>
          <option value="entrada">Ordenar por orden de entrada</option>
        </select></div>
        <PlatillosList 
          platillos={platillos} 
          onEditPlatillo={handleEditPlatillo} 
          onDeletePlatillo={handleDeletePlatillo}
          orden={orden} // Pasamos el estado del orden a PlatillosList
          busqueda={busqueda}
        />
      </div>
    </div>
  );
}

export default App;
