const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    text:"Funciona"
  })
});

router.post('/api/login', (req, res) => {
  const user = {id:3}
  const token = jwt.sign({user}, 'my_secret_key', {expiresIn:300})
  res.json({
    token
  })

})

router.get('/api/protected', ensureToken, (req,res) => {
  // validamos el token
  jwt.verify(req.token, "my_secret_key", (error, data) => {
    if(error){
      res.sendStatus(403)
    }else{
      res.json({
        text: 'Protected'
      })
    }
  })
})

function ensureToken(req,res,next){
  const beareHeader = req.headers["authorization"]
  console.log(beareHeader)
  if(typeof beareHeader !== 'undefined') {
    const bearer = beareHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken
    next()

  }else{
    res.sendStatus(403)
  }
}

module.exports = router;
