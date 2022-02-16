const { Track, Singer } = require("../models/models")
const { Op } = require('sequelize')
class TrackService {
    async getTrack(req, res){
        try{
            let {trackName, regDate, page, limit} = req.query
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit 
            if(trackName){
                    const conv = trackName.split(" ")
                    const tracks = await Track.findAndCountAll({ include: [{
                        model: Singer,
                        include: [{
                            model: Track
                        }]
                    }],  where: {title: conv}, limit, offset })
                    return res.json(tracks)
            }
            if(regDate){
                const trDate = regDate
                    
                const tarckDate = await Track.findAndCountAll({include: [{
                    model: Singer,
                    include: [{
                        model: Track
                    }]
                }], where: {createdAt: {[Op.gt]: trDate}}, limit, offset} )
                    
                return res.json(tarckDate)
            }
            const tracks = await Track.findAndCountAll({include: [{
                model: Singer,
                    include: [{
                        model: Track
                    }]
                }], limit, offset})
            return res.json(tracks)



        }catch(e){
            console.log(e)
        }

    }

    async createTrack(req, res){
            try{
                const {title, singerId} = req.body
                const track = await Track.create({title, singerId})
                
                if(!track){
                    return res.status(401).json({message:'track not created!'})
                }
                return res.json(track)
            }catch(e){
                console.log(e)
            }
    }

    async updateTrack(req, res){
        try{
           
            const findTrack = await Track.findOne({where: { id: req.params.id }})
            if(!findTrack){

                return res.status(401).json({message:"Track not found!"})
            }
            const upBody = req.body
            const updateOne = await findTrack.update(upBody)
           
            return res.status(200).json(updateOne)
           
    
        }catch(e){
            console.log(e)
        }
    }

    async deleteTrack(req, res){
        try{
           
            const deleteTrack = await Track.destroy({where: { id: req.params.id }})
            if(!deleteTrack){

                return res.status(401).json({message:"Track not found!"})
            }
            return res.status(200).json({message:"Track deleted"})
           
    
        }catch(e){
            console.log(e)
        }
    }
}

module.exports = new TrackService()