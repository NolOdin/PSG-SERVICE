const Router = require('express')
const singerRoute = require('./singer-route')
const trackRoute = require('./track-route')

const router = new Router()

router.use('/track', trackRoute)
router.use('/singer', singerRoute)


module.exports = router