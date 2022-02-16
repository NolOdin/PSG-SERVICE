const { Singer, Track } = require("../models/models")
const { Op, INET} = require('sequelize')
const { Console } = require("winston/lib/winston/transports")

class SingerService {
    async getSinger(req, res){
        try{
            let {singerName, regDate, page, limit} = req.query
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit 
            if(singerName){
                    const conv = singerName.split(" ")
                        
                    const singes = await Singer.findAndCountAll({include: [{
                        model: Track,
                        include: [{
                        model: Singer
                        }]
                    }], where: {name: conv}, limit, offset})
                        
                    return res.json(singes)
            }
                
            if(regDate){
                    const convDate = regDate
                        
                    const singesDate = await Singer.findAndCountAll({include: [{
                        model: Track,
                        include: [{
                        model: Singer
                        }]
                    }], where: {createdAt: {[Op.gt]: convDate}}, limit, offset} )
                        
                    return res.json(singesDate)
            }

            const singers = await Singer.findAndCountAll({include: [{
            model: Track,
                include: [{
                    model: Singer
                }]
            }], limit, offset})
            return res.json(singers)
        }catch(e){
            console.log(e)
        }

    }

    async createSinger(req, res){
            try{
                const {name} = req.body
                if(name == 'Monetochka'){
                    return res.status(401).json({message:'unwanted singer!'})
                }
                const singer = await Singer.create({name})
                
                if(!singer){
                    return res.status(401).json({message:'signer not created!'})
                }
                return res.json(singer)
            }catch(e){
                console.log(e)
            }
    }

    async updateSinger(req, res){
        try{
           
            const findSin = await Singer.findOne({where: { id: req.params.id }})
            if(!findSin){

                return res.status(401).json({message:"Signer not found!"})
            }
            const upBody = req.body
            const updateOne = await findSin.update(upBody)
           
            return res.status(200).json(updateOne)
           
    
        }catch(e){
            console.log(e)
        }
    }

    async deleteSinger(req, res){
        try{
           
            const deleteSinger = await Singer.destroy({where: { id: req.params.id }})
            if(!deleteSinger){

                return res.status(401).json({message:"Signer not found!"})
            }
            return res.status(200).json({message:"Singer deleted"})
           
    
        }catch(e){
            console.log(e)
        }
    }
    
}

module.exports = new SingerService()


