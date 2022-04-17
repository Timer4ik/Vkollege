const SubjectRepository = require("./SubjectRepository.js")


class SubjectController {
   async createSubject(req, res) {
      const data = req.body
      try {
         const {subject} = await SubjectRepository.createSubject(data)
         return res.json({message:"Новая запись успешно добавлена",body:{
            subject
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
   async updateSubject(req, res) {
      const data = req.body
      const {subject_id} = req.params
      try {
         const {subject} = await SubjectRepository.updateSubject({...data,subject_id})
         return res.json({message:"Запись успешно изменена",body:{
            subject
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
   async deleteSubject(req, res) {
      const {subject_id} = req.params
      try {
         const {subject} = await SubjectRepository.deleteSubject({subject_id})
         return res.json({message:"Запись успешно удалена",body:{
            subject
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
   async getSubjects(req, res) {
      try {
         const {subject} = await SubjectRepository.getSubjects()
         return res.json({message:"Все записи успешно получены",body:{
            subject
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
}

module.exports = new SubjectController()