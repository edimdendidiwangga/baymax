var express = require('express');
var router = express.Router();
var model = require('../models')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/index', { users : [] });
});

router.get('/register', function(req, res, next) {
  res.render('users/register', {  });
});
router.post('/register', function(req, res, next) {
  model.Pasien.create({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  }).then((data)=>{
    res.redirect('/')
  })
});
router.get('/searchDisease', function(req, res, next) {
  model.Penyakit.findAll()
  .then((penyakits)=>{
    let item = []
    penyakits.forEach((penyakit)=>{
      item.push(penyakit.name)
    })
    //res.send(item)
    res.render('users/search_disease', { data : item });
  })

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
  model.Diagnosa.findAll()
  .then((diagnosas)=>{
    let item = []
    diagnosas.forEach((diagnosa)=>{
      item.push(diagnosa.gejala)
    })
    //res.send(item)
    res.render('users/search_diagnosis', { data : item });
  })
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

module.exports = router;
