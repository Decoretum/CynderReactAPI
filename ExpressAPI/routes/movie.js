const express = require('express')
const router = express.Router()
const {functions} = require('../backend')



router.route('/new')
.get((req, res, next) => {})
.post((req, res, next)=>{console.log(req)})

router.route('/:name')
.get(functions[0], ()=>{})  

router.route('/')
.get((req, res, next) => {res.json({home:true})})


module.exports = router