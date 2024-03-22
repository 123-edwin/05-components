import React, { useState, useEffect, useRef } from 'react';
import './PlatilloForm.css'

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
    if (!formData.comida || !formData.descripcion || formData.acompaniantes.length === 0 || !formData.picor) {
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
    <div>
      <h2>{platillo ? 'Editar Platillo' : 'Agregar Platillo'}</h2>
      <form ref={formRef}>
        <label>
          Título del Platillo:
          <input required type="text" value={formData.comida} onChange={(e) => setFormData(prevState => ({ ...prevState, comida: e.target.value }))} />
        </label>
        <br />
        <label>
          Descripción del Platillo:
          <textarea required value={formData.descripcion} onChange={(e) => setFormData(prevState => ({ ...prevState, descripcion: e.target.value }))} />
        </label>
        <br />
        <label>
          Acompañantes:
          <br />
          {['Salsa verde', 'Salsa roja', 'Aguacate', 'Cebollitas'].map((opcion, index) => (
            <div key={index}>
              <input required
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
            <div key={index}>
              <input required
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
          <select value={formData.numPersonas} onChange={(e) => setFormData(prevState => ({ ...prevState, numPersonas: e.target.value }))}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </label>
        <br />
        <label>
          URL de la Imagen:
          <input type="text" value={formData.image} onChange={(e) => setFormData(prevState => ({ ...prevState, image: e.target.value }))} />
        </label>
        <br />
        <button type="button" onClick={handleGuardar}>Guardar</button>
        <button type="button" onClick={handleCancelar}>Cancelar</button>
      </form>
    </div>
  );
};

// Función para generar un ID único
const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9); // Genera un identificador único de 9 caracteres
  };
  
  export default PlatilloForm;
  
