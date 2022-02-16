const Router = require('express')
const TrackService = require('../controllers/track-controller')
const router = new Router()

router.post('/', TrackService.createTrack )
router.get('/', TrackService.getTrack )
router.put('/:id', TrackService.updateTrack )
router.delete('/:id', TrackService.deleteTrack )


module.exports = router