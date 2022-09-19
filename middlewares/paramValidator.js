'use strict'; 

module.exports = (param) => {
  const isNotEmpty = (req, res,next) => {
    const value = req.params[param]
    if(value !== undefined && value !== null) return next()
    
    return res.status(400).json({
      message: `${param} cannot be empty`
    })
  }

  return {isNotEmpty}
}
