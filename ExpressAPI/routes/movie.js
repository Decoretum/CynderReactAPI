const express = require('express')
const router = express.Router()
const {functions} = require('../backend')



router.route('/new')
.get(functions[3],() => {})
.post(functions[1],()=>{})

router.route('/:id')
.get(functions[0], ()=>{})  
.delete(functions[7], ()=>{})

router.route('/:id/edit')
.get(functions[5], ()=> {})
.put(functions[6], ()=>{})


router.route('/')
.get(functions[2], () => {})


module.exports = router