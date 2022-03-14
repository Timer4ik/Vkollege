const {Teacher} = require("../../models/models.js")


class TeacherRepository {
   async createTeacher({name}){
      const newTeacher = await Teacher.create({
         name
      })
      return {teacher:newTeacher}
   }
   async updateTeacher({name,teacher_id}){
      const findedTeacher = await Teacher.findOne({
         where:{
            teacher_id
         }
      })
      if(!findedTeacher){
         throw new Error("Такой записи не существует")
      }
      const updatedTeacher = await Teacher.update({name},{
         where:{
            teacher_id
         },
         returning:true,
         plain:true
      })
      return {teacher:updatedTeacher[1]}
   }
   async deleteTeacher({teacher_id}){
      const findedTeacher = await Teacher.findOne({
         where:{
            teacher_id
         }
      })
      if(!findedTeacher){
         throw new Error("Такой записи не существует")
      }
      const deletedTeacher = await Teacher.destroy({
         where:{
            teacher_id
         },
      })
      return {teacher:findedTeacher}
   }
   async getTeachers(){
      const findedTeachers = await Teacher.findAll()
   
      return {teacher:findedTeachers}
   }
}

module.exports = new TeacherRepository()