import React from 'react';
import Platillo from './Platillo';
import 'bootstrap/dist/css/bootstrap.css';
import './PlatilloList.css'

const PlatillosList = ({ platillos, onEditPlatillo, onDeletePlatillo, orden, busqueda }) => {
  
  
  const valorPicor = (picor) => {
    if (picor === 'No pica') {
      return 1;
    } else if (picor === 'Sí pica') {
      return 0;
    } else {
      return 2;
    }
  };
  
  const compararPlatillos = (a, b) => {
    if (orden === 'nombre') {
      return a.comida.localeCompare(b.comida);
    } else if (orden === 'picor') {
      return valorPicor(a.picor) - valorPicor(b.picor);
    } else if (orden === 'entrada') {
      return a.id - b.id; // Ordenar por orden de entrada
    }
  };
  

  const filtrarPlatillos = (platillo) => {
    for (const key in platillo) {
      if (platillo[key].toString().toLowerCase().includes(busqueda.toLowerCase())) {
        return true;
      }
    }
    return false;
  };

  const platillosFiltrados = busqueda ? platillos.filter(filtrarPlatillos) : platillos;
  
  const platillosOrdenados = platillosFiltrados.sort(compararPlatillos);

  return (
    <div className='platillos-container'>
      {platillosOrdenados.map((platillo) => (
        <Platillo
          key={platillo.id}
          platillo={platillo}
          onEdit={() => onEditPlatillo(platillo.id)}
          onDelete={() => onDeletePlatillo(platillo.id)}
        />
      ))}
    </div>
  );
};

export default PlatillosList;
