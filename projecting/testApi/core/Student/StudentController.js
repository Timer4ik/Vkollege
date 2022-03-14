const StudentRepository = require("./StudentRepository.js")


class StudentController {
   async createStudent(req, res) {
      const data = req.body
      try {
         const {student} = await StudentRepository.createStudent(data)
         return res.json({message:"Новая запись успешно добавлена",body:{
            student
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
   async updateStudent(req, res) {
      const data = req.body
      const {student_id} = req.params
      try {
         const {student} = await StudentRepository.updateStudent({...data,student_id})
         return res.json({message:"Запись успешно изменена",body:{
            student
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
   async deleteStudent(req, res) {
      const {student_id} = req.params
      try {
         const {student} = await StudentRepository.deleteStudent({student_id})
         return res.json({message:"Запись успешно удалена",body:{
            student
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
   async getStudents(req, res) {
      try {
         const {student} = await StudentRepository.getStudents()
         return res.json({message:"Все записи успешно получены",body:{
            student
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
}

module.exports = new StudentController()