const express = require('express')
const router = express.Router()
const {functions} = require('../backend')

router.route('/api/queried', functions[4], ()=>{})

module.exports = router;