const express = require('express');
const router = express.Router();
const usuarios = require('./usuarios');


router.get('/', (req, res) => {
    res.send(`
     <h1>Lista de usuarios</h1>
     <ul>${usuarios.map((usuario) => `<li>ID: ${usuario.id} | Nombre: ${usuario.nombre} | Edad: ${usuario.edad} | Lugar de procedencia: ${usuario.lugarProcedencia}</li>`).join('')}
    </ul>
    <form action="/usuarios" method="post">
    <label for"nombre">Nombre</label>
    <input type="text" id="nombre" name="nombre" required>

    <label for"edad">Edad</label>
    <input type="text" id="edad" name="edad" required>

    <label for"lugarProcedencia">Lugar de procedencia</label>
    <input type="text" id="lugarProcedencia" name="lugarProcedencia" required>

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
  
  router.get('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);
    if(usuario) {
        res.json(usuario);
    } else {
        res.status(404).send('Usuario no encontrado');
    }
})

router.put('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const usuarioIndex = usuarios.findIndex(u => u.nombre === nombre);

if(usuarioIndex === -1) {
     usuarios[usuarioIndex].edad = req.body.edad
     usuarios[usuarioIndex].lugarProcedencia = req.body.lugarProcedencia
     res.json(usuarios[usuarioIndex])
   
} else {
    res.status(404).send('Usuario  no encontrado');
}
});

router.delete('/:nombre', (req, res) => {
  const nombre = req.params.nombre 
  usuarios = usuarios.filter(u => u.nombre !== nombre)
  res.json({mensaje: "Usuario eliminado"})
})


  module.exports = router;