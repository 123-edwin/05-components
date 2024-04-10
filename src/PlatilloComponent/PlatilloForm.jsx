import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';


const PlatilloForm = ({ onSave, onCancel, platillo }) => {
  const initialState = {
    comida: '',
    descripcion: '',
    acompaniantes: [],
    picor: '',
    numPersonas: 1,
    image: ''
  };

  const [formData, setFormData] = useState(initialState);
  const formRef = useRef(null);

  useEffect(() => {
    if (platillo) {
      setFormData({
        comida: platillo.comida || '',
        descripcion: platillo.descripcion || '',
        acompaniantes: platillo.acompaniantes || [],
        picor: platillo.picor || '',
        numPersonas: platillo.num_personas || 1,
        image: platillo.image || ''
      });
    } else {
      setFormData(initialState);
    }
  }, [platillo]);

  const handleCheckboxChange = (opcion) => {
    if (formData.acompaniantes.includes(opcion)) {
      setFormData(prevState => ({
        ...prevState,
        acompaniantes: prevState.acompaniantes.filter(item => item !== opcion)
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        acompaniantes: [...prevState.acompaniantes, opcion]
      }));
    }
  };

  const handleGuardar = () => {
    if (!formData.comida || !formData.descripcion || formData.acompaniantes.length === 0 || !formData.picor || !formData.image) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    const nuevoPlatillo = {
      id: platillo ? platillo.id : generateUniqueId(),
      comida: formData.comida,
      descripcion: formData.descripcion,
      acompaniantes: formData.acompaniantes,
      picor: formData.picor,
      num_personas: formData.numPersonas,
      image: formData.image
    };
    onSave(nuevoPlatillo);
    formRef.current.reset(); // Restablecer el formulario
    setFormData(initialState); // Restablecer el estado del formulario
  };

  const handleCancelar = () => {
    onCancel();
    formRef.current.reset(); // Restablecer el formulario
    setFormData(initialState); // Restablecer el estado del formulario
  };

  return (
    <div className='contenido' style={{color:'white'}}>
      <h2>{platillo ? 'Editar Platillo' : 'Agregar Platillo'}</h2>
      <form ref={formRef}>
        <label>
          Título del Platillo:
          <input required type="text" class="form-control" value={formData.comida} onChange={(e) => setFormData(prevState => ({ ...prevState, comida: e.target.value }))} />
        </label>
        <br />
        <label>
          Descripción del Platillo:
          <textarea class="form-control" required value={formData.descripcion} onChange={(e) => setFormData(prevState => ({ ...prevState, descripcion: e.target.value }))} />
        </label>
        <br />
        <label>
          Acompañantes:
          <br />
          {['Salsa verde', 'Salsa roja', 'Aguacate', 'Cebollitas'].map((opcion, index) => (
            <div key={index} class="form-check">
              <input required class="form-check-input"
                type="checkbox"
                value={opcion}
                checked={formData.acompaniantes.includes(opcion)}
                onChange={() => handleCheckboxChange(opcion)}
              />
              {opcion}
            </div>
          ))}
        </label>
        <br />
        <label>
          Picor:
          <br />
          {['Sin picante', 'No pica', 'Sí pica'].map((opcion, index) => (
            <div key={index} class="form-check">
              <input required class="form-check-input"
                type="radio"
                value={opcion}
                checked={formData.picor === opcion}
                onChange={() => setFormData(prevState => ({ ...prevState, picor: opcion }))}
              />
              {opcion}
            </div>
          ))}
        </label>
        <br />
        <label>
          Número de Personas:
          <select class="form-select" value={formData.numPersonas} onChange={(e) => setFormData(prevState => ({ ...prevState, numPersonas: e.target.value }))}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </label>
        <br />
        <label>
          URL de la Imagen:
          <input class="form-control" type="text" value={formData.image} onChange={(e) => setFormData(prevState => ({ ...prevState, image: e.target.value }))} />
        </label>
        <br />
        <div className='botones' style={{marginTop: '1rem'}}>
        <button type="button" class="btn btn-success me-2" onClick={handleGuardar}>Guardar</button>
        <button type="button" class="btn btn-warning" onClick={handleCancelar}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

// Función para generar un ID único
let nextId = 0;

const generateUniqueId = () => {
    return nextId++;
};

  
  export default PlatilloForm;
  
