const express = require('express');
const router = express.Router();
const usuarios = require('./usuarios');


router.get('/', (req, res) => {
    res.send(`
     <h1>Lista de usuarios</h1>
     <ul>${usuarios
       .map((usuario) => `<li>ID: ${usuario.id} | Nombre: ${usuario.nombre} | Edad: ${usuario.edad} | Lugar de procedencia: ${usuario.lugarProcedencia}</li>`)
       .join('')}
    </ul>
    <form action="/usuarios" method="post">
    <label for"nombre">Nombre</label>
    <input type="text" id="nombre" name="nombre" required>
    <button type="submit">Agregar usuario</button>
    </form>
    <a href="/usuarios">Usuarios json</a>
    `);
  });


  router.get('/usuarios', (req, res) => {
    res.json(usuarios);
  });

  router.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
      id: usuarios.length + 1,
      nombre: req.body.nombre,
      edad: req.body.edad,
      lugarProcedencia: req.body.lugarProcedencia,
    };
    usuarios.push(nuevoUsuario);
    res.redirect('/');
  });
  

  module.exports = router;