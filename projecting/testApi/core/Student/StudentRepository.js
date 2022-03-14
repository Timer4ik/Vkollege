const {Student} = require("../../models/models.js")


class StudentRepository {
   async createStudent({name,group_id}){
      const newStudent = await Student.create({
         name,group_id
      })
      return {student:newStudent}
   }
   async updateStudent({name,group_id,student_id}){
      const findedStudent = await Student.findOne({
         where:{
            student_id
         }
      })
      if(!findedStudent){
         throw new Error("Такой записи не существует")
      }
      const updatedStudent = await Student.update({name,group_id},{
         where:{
            student_id
         },
         returning:true,
         plain:true
      })
      return {student:updatedStudent[1]}
   }
   async deleteStudent({student_id}){
      const findedStudent = await Student.findOne({
         where:{
            student_id
         }
      })
      if(!findedStudent){
         throw new Error("Такой записи не существует")
      }
      const deletedStudent = await Student.destroy({
         where:{
            student_id
         },
      })
      return {student:findedStudent}
   }
   async getStudents(){
      const findedStudents = await Student.findAll()
   
      return {student:findedStudents}
   }
}

module.exports = new StudentRepository()