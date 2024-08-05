const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

const TOKEN = 'secreto123';

app.use(bodyParser.json());

app.use((req, res, next) => {
  const token = req.headers['authorization'];

  if (token !== `Bearer ${TOKEN}`) {
    return res.status(403).json({ message: 'Acceso no autorizado' });
  }

  next();
});

app.post('/api/process', (req, res) => {
  const { nombre, email, telefono, monto } = req.body;
  
  // Aquí puedes procesar los datos recibidos como desees
  console.log(`Nombre: ${nombre}, Email: ${email}, Teléfono: ${telefono}, Monto: ${monto}`);

  res.status(200).json({ message: 'Datos recibidos y procesados correctamente.' });
});

app.listen(port, () => {
  console.log(`Servicio web escuchando en http://localhost:${port}`);
});
