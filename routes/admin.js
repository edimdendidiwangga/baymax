var express = require('express');
var router = express.Router();
const db = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('admin/index', {  });
});
//------------------------------ PENYAKIT -----------------------------------------------
router.get('/disease', function(req, res, next) {
  db.Penyakit.findAll()
    .then(record => {
      res.render('admin/disease', { penyakit: record });
    })
    .catch(() => {
      res.redirect('/404')
    })
});

router.get('/add_disease', function(req, res, next) {
  res.render('admin/form_penyakit', {  });
});

router.post('/add_disease',function(req, res, next) {
  db.Penyakit.create(
    {name: req.body.name, deskripsi: req.body.description , solusi: req.body.solution}
  ).then(data => {
    res.redirect('/admin/disease')
  })
})
//------------------------- GEJALA --------------------------------------------
router.get('/diagnosis', function(req, res, next) {
  db.Diagnosa.findAll({include:[{model:db.Penyakit}]})
    .then(record => {
      console.log("=========",record);
      res.render('admin/diagnosis', { gejala: record });
    })
    .catch(() => {
      res.redirect('/404')
    })
});

router.get('/add_diagnosis', function(req, res, next) {
  db.Penyakit.findAll()
    .then(record => {
      res.render('admin/form_gejala', { penyakit: record });
    })
});

router.post('/add_diagnosis',function(req, res, next) {
  db.Diagnosa.create(
    {gejala: req.body.indication, penyakit_id: req.body.penyakit_id}
  ).then(data => {
    res.redirect('/admin/diagnosis')
  })
})

// ------------------------ EDIT ---------------------------

router.get('/edit_penyakit/:id', function(req, res) {
  let id = req.params.id
  db.Penyakit.findById(id)
    .then( penyakit => {
      res.render('admin/edit_penyakit',{ penyakit: penyakit})
    })
})
router.post('/edit_penyakit/:id', function(req, res) {
  let id = req.params.id
  db.Penyakit.update({
    name: req.body.name,
    deskripsi: req.body.description,
    solusi: req.body.solution
  },{
    where: {id: id}
  })
    .then( () => {
      res.redirect('/admin/disease')
    })
})


router.get('/edit_gejala/:id', function(req, res) {
  let id = req.params.id
  db.Diagnosa.findById(id)
    .then( gejala => {
      db.Penyakit.findAll()
        .then( penyakit => {
          res.render('admin/edit_gejala',{ gejala: gejala, penyakit:penyakit})
        })
    })
})
router.post('/edit_gejala/:id', function(req, res) {
  let id = req.params.id
  db.Diagnosa.update({
    gejala: req.body.indication,
    penyakit_id: req.body.penyakit_id
  },{
    where: {id: id}
  })
    .then( () => {
      res.redirect('/admin/diagnosis')
    })
})

//////////////////////////// DELETE ////////////////////////////

router.get("/delete_penyakit/:id", function(req, res, next) {
  db.Penyakit.destroy({
    where: {id: req.params.id}
  }).then(()=>{
      db.Diagnosa.destroy({
        where: {penyakit_id: req.params.id}
      }).then(()=>{
        res.redirect("/admin/disease")
      })
  }).catch((err) => {
    res.send(err.message)
  })
})
router.get("/delete_gejala/:id", function(req, res, next) {
  db.Diagnosa.destroy({
    where: {id: req.params.id}
  }).then(()=>{
    res.redirect("/admin/diagnosis")
  }).catch((err) => {
    res.send(err.message)
  })
})

module.exports = router;
