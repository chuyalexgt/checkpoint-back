'use strict';

module.exports = (target) => {
  const isNotEmpty = (req, res,next) => {
    if(Array.isArray(target)){
      const emptyParams = target.filter((value) => req.body[value] === undefined || req.body[value] === null)

      if(emptyParams.length === 0) return next()

      return res.status(400).json({
        message: `${emptyParams.join()} cannot be empty`
      })

    }
    else{
      const value = req.body[target]
      if(value !== undefined || value !== null) return next()
  
      return res.status(400).json({
        message: `${target} cannot be empty`
      })
    }

  }

  return {isNotEmpty}
}
