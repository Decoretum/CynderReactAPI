const express = require('express')
const router = express.Router()
const {functions} = require('../backend')



router.route('/new')
.get((req, res, next) => {})
.post(functions[1],()=>{})

router.route('/:id')
.get(functions[0], ()=>{})  

router.route('/')
.get((req, res, next) => {res.json({home:true})})


module.exports = router