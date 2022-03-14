const TeacherRepository = require("./TeacherRepository.js")


class TeacherController {
   async createTeacher(req, res) {
      const data = req.body
      try {
         const {teacher} = await TeacherRepository.createTeacher(data)
         return res.json({message:"Новая запись успешно добавлена",body:{
            teacher
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
   async updateTeacher(req, res) {
      const data = req.body
      const {teacher_id} = req.params
      try {
         const {teacher} = await TeacherRepository.updateTeacher({...data,teacher_id})
         return res.json({message:"Запись успешно изменена",body:{
            teacher
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
   async deleteTeacher(req, res) {
      const {teacher_id} = req.params
      try {
         const {teacher} = await TeacherRepository.deleteTeacher({teacher_id})
         return res.json({message:"Запись успешно удалена",body:{
            teacher
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
   async getTeachers(req, res) {
      try {
         const {teacher} = await TeacherRepository.getTeachers()
         return res.json({message:"Все записи успешно получены",body:{
            teacher
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
}

module.exports = new TeacherController()