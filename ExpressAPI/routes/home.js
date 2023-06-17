const express = require('express')
const router = express.Router()
const {functions} = require('../backend')

router.route('/')
.get(functions[2], ()=>{})


module.exports = router