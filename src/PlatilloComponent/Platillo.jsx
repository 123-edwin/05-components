import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Platillo.css';

const Platillo = ({ platillo, onEdit, onDelete }) => {
  return (
    <div class="card" style={{width: '18rem', marginBottom:'1rem', marginRight:'1rem', backgroundColor:'rgba(255, 255, 255, 0.5)', border:'2px solid black'}}>
      <h3 class="card-title" style={{textAlign: 'center'}}>{platillo.comida}</h3>
      <p class="card-subtitle mb-2 text-muted"><strong>Descripción:</strong> {platillo.descripcion}</p>
      <p class="card-subtitle mb-2 text-muted"><strong>Acompañantes:</strong> {platillo.acompaniantes.join(', ')}</p>
      <p class="card-subtitle mb-2 text-muted"><strong>Picor:</strong> {platillo.picor}</p>
      <p class="card-subtitle mb-2 text-muted"><strong>Número de personas:</strong> {platillo.num_personas}</p>
      <img class="card-img-top mx-auto" src={platillo.image} alt={platillo.comida} style={{ width: '100px', height: '100px'}} />
      <div class="text-center" style={{marginTop: 10}}>
      <button type="button" class="btn btn-info me-2" onClick={() => onEdit(platillo)}>Editar</button>
      <button type="button" class="btn btn-danger" onClick={() => onDelete(platillo)}>Eliminar</button>
      </div>
    </div>
  );
};

export default Platillo;
