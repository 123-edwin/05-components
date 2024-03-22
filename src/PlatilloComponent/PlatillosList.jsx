import React from 'react';
import Platillo from './Platillo'; // Importamos el componente Platillo

const PlatillosList = ({ platillos, onEditPlatillo, onDeletePlatillo }) => {
  return (
    <div>
      <h1>Platillos</h1>
      {/* Mapeamos los platillos para renderizar cada uno */}
      {platillos.map((platillo) => ( // Quitamos el parámetro "index"
        <Platillo
          key={platillo.id} // Usamos el ID del platillo como clave
          platillo={platillo}
          onEdit={() => onEditPlatillo(platillo.id)} // Pasamos el ID del platillo
          onDelete={() => onDeletePlatillo(platillo.id)} // Pasamos el ID del platillo
        />
      ))}
    </div>
  );
};

export default PlatillosList;
