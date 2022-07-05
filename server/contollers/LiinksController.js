const {Link} = require("../models/Links")
const config = require('config')
const shortid = require('shortid')


class LinksController {
    async generate(req,res){
        try {
            const baseUrl = config.get('baseURL')
            const {from} = req.body

        
            const code = shortid.generate()
            const existing = await Link.findOne({ from })
        
            if (existing) {
              return res.json({ link: existing })
            }
        
            const to = baseUrl + '/t/' + code
            const link = await Link.create({code,to,from, owner: req.user.userId})
        
            res.status(201).json({ link })
          } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
          }
        }

    async getAll(req,res){
        try {
            const links = await Link.find({owner: req.user.userId}) 
            res.json(links)
        }catch(e){
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }

    async getById(req,res){
        try {
            const link = await Link.findById(req.params.id) 
            res.json(link)
        }catch(e){
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }

}

module.exports = new LinksController()