const SpecRepository = require("./SpecRepository.js")


class SpecController {
   async createSpec(req, res) {
      const data = req.body
      try {
         const {spec} = await SpecRepository.createSpec(data)
         return res.json({message:"Новая запись успешно добавлена",body:{
            spec
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
   async updateSpec(req, res) {
      const data = req.body
      const {spec_id} = req.params
      try {
         const {spec} = await SpecRepository.updateSpec({...data,spec_id})
         return res.json({message:"Запись успешно изменена",body:{
            spec
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
   async deleteSpec(req, res) {
      const {spec_id} = req.params
      try {
         const {spec} = await SpecRepository.deleteSpec({spec_id})
         return res.json({message:"Запись успешно удалена",body:{
            spec
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
   async getSpecs(req, res) {
      try {
         const {specs} = await SpecRepository.getSpecs()
         return res.json({message:"Все записи успешно получены",body:{
            specs
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
}

module.exports = new SpecController()