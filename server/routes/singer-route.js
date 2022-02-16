const Router = require('express')
const SingerService = require('../controllers/singer-controller')

const router = new Router()

router.post('/', SingerService.createSinger)
router.get('/', SingerService.getSinger )
router.put('/:id', SingerService.updateSinger )
router.delete('/:id', SingerService.deleteSinger)


module.exports = router