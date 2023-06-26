const express = require('express')
const router = express.Router()
const {functions} = require('../backendgenre')

router.route('/')
.get(functions[0], ()=>{})
.post(functions[2], ()=>{})

router.route('/:id')
.get(functions[1], ()=>{})
.put(functions[3], ()=>{})
.delete(functions[4], ()=>{})

module.exports = router;

