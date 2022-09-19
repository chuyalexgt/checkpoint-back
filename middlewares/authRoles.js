'use strict';

const {userRoles} = require('../databases/users')

module.exports = (role) => {
  //recibe el rol por nombre, ej. 'admin', 'empresa', 'usuario'
  const validateRole = (req, res, next) => {
    if (!req.body?.usuario) return res.status(500).json({ message: 'problema interno con la informacion del usuario' })
    const { usuario } = req.body
    //valida el rol con el arreglo de roles
    try {
      const rolByValue = userRoles[role]
      if(usuario.role === rolByValue) return next()
    } catch (error) {
      throw new Error('el rol pasado por parametro no esta registrado')
    }

    return res.status(403).json({message: 'No tienes permisos para acceder a esta funcion'})
  }

  return validateRole
}

