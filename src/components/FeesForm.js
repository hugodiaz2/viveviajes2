import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const FeesForm = () => {
  const router = useRouter();
  const { title, price } = router.query;

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    monto: price ? price.replace(' MXN', '') : '',
  });

  useEffect(() => {
    if (price) {
      setFormData((prevData) => ({
        ...prevData,
        monto: price.replace(' MXN', ''),
      }));
    }
  }, [price]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/paypal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url;
      } else {
        console.error('Error en la redirección a PayPal.');
      }
    } catch (error) {
      console.error('Error procesando el pago:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">{title ? title : 'Formulario de Pago'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Monto</label>
            <input
              type="number"
              name="monto"
              value={formData.monto}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-orange-500 text-white rounded"
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeesForm;
