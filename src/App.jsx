import React, { useState } from 'react';
import PlatilloForm from './PlatilloComponent/PlatilloForm';
import PlatillosList from './PlatilloComponent/PlatillosList'; // Importa el componente PlatillosList

function App() {
  const [platillos, setPlatillos] = useState([]);
  const [editPlatilloId, setEditPlatilloId] = useState(null); // Cambio aquí

  const handleSavePlatillo = (nuevoPlatillo) => {
    if (editPlatilloId !== null) { // Cambio aquí
      // Si editPlatilloId no es null, significa que estamos editando un platillo existente
      const updatedPlatillos = platillos.map(platillo => {
        if (platillo.id === editPlatilloId) {
          return nuevoPlatillo;
        }
        return platillo;
      });
      setPlatillos(updatedPlatillos);
      setEditPlatilloId(null); // Restablece editPlatilloId a null después de guardar
    } else {
      // Si editPlatilloId es null, significa que estamos creando un nuevo platillo
      setPlatillos([...platillos, nuevoPlatillo]);
    }
  };

  const handleCancelEdit = () => {
    // Lógica para cancelar la edición o creación de un platillo
    // Aquí puedes restablecer cualquier estado necesario
    setEditPlatilloId(null);
  };

  const handleEditPlatillo = (id) => { // Cambio aquí
    // Función para manejar la edición de un platillo
    // Actualiza el estado editPlatilloId para indicar qué platillo se está editando
    setEditPlatilloId(id); // Cambio aquí
  };

  const handleDeletePlatillo = (id) => { // Cambio aquí
    // Función para manejar la eliminación de un platillo
    // Crea una copia del array de platillos sin el platillo que se va a eliminar
    const updatedPlatillos = platillos.filter(platillo => platillo.id !== id); // Cambio aquí
    // Actualiza el estado de platillos con la nueva lista de platillos
    setPlatillos(updatedPlatillos);
  };

  return (
    <div>
      <h1>Gestión de Platillos</h1>
      {/* Renderizar PlatilloForm */}
      <PlatilloForm onSave={handleSavePlatillo} onCancel={handleCancelEdit} platillo={editPlatilloId !== null ? platillos.find(platillo => platillo.id === editPlatilloId) : null} /> {/* Cambio aquí */}
      
      {/* Renderizar PlatillosList y pasar las propiedades necesarias */}
      <PlatillosList 
        platillos={platillos} 
        onEditPlatillo={handleEditPlatillo} 
        onDeletePlatillo={handleDeletePlatillo} 
      />
    </div>
  );
}

export default App;
