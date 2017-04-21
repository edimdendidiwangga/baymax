var express = require('express');
var router = express.Router();
var model = require('../models')
const crypto = require('crypto');
const shortid = require('shortid');
/* GET users listing. */


router.get('/searchDisease', function(req, res, next) {
  if (req.session.username) {
    model.Penyakit.findAll()
    .then((penyakits)=>{
      let item = []
      penyakits.forEach((penyakit)=>{
        item.push(penyakit.name)
      })
      //res.send(item)
      res.render('users/search_disease', { data : item });
    })
  } else {
      res.render('auth/login')
  }
});
router.post('/searchDisease', function(req, res, next) {
  let search_disease = req.body.disease;
    model.Penyakit.findAll({
    include : [model.Diagnosa],
    where: {
      name: {
        $like: `%${search_disease}%`
      }
    }
  }).then(data=>{
    //res.send(data)
    res.render('users/search_result_disease', {input:search_disease,  data: data });
  })

})
router.get('/searchDiagnosis', function(req, res, next) {
  if (req.session.username) {
    model.Diagnosa.findAll()
    .then((diagnosas)=>{
      let item = []
      diagnosas.forEach((diagnosa)=>{
        item.push(diagnosa.gejala)
      })
      //res.send(item)
      res.render('users/search_diagnosis', { data : item });
    })
  } else {
      res.render('auth/login')
  }


});

router.post('/searchDiagnosis', function(req, res, next) {
let search_gejala = req.body.diagnosis;
  model.Diagnosa.findAll({
  include : [model.Penyakit],
  where: {
    gejala: {
      $like: `%${search_gejala}%`
    }
  }
}).then(data=>{
  res.render('users/search_result_diagnosis', {input:search_gejala, data: data });
})
});

router.post('/register', function(req, res, next){
  console.log(req.body);
  const secret = shortid.generate();
  const hash = crypto.createHmac('sha256', secret)
                     .update(req.body.password)
                     .digest('hex');
    model.Pasien.create({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: hash,
      salt: secret,
      role: 'client'
   }).then((user) => {
     res.redirect('/')
   })
})

router.post('/login', function(req, res, next){
  model.Pasien.find({
    where: {
      email: req.body.email
    }
  }).then((user) => {
    const hash = crypto.createHmac('sha256', user.salt)
                       .update(req.body.password)
                       .digest('hex');
    if (user.password == hash) {
      req.session.name = user.name
      req.session.username = user.username
      req.session.id = user.id
      req.session.email = user.email
      req.session.role = user.role

      console.log('Authentication success');
      res.redirect('/')
    } else{
      console.log('Authentication fail');
      res.redirect('/login')

    }
  })
})
module.exports = router;
