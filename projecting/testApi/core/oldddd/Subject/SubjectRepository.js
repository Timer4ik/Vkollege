const {Subject} = require("../../models/models.js")


class SubjectRepository {
   async createSubject({name}){
      const newSubject = await Subject.create({
         name
      })
      return {subject:newSubject}
   }
   async updateSubject({name,subject_id}){
      const findedSubject = await Subject.findOne({
         where:{
            subject_id
         }
      })
      if(!findedSubject){
         throw new Error("Такой записи не существует")
      }
      const updatedSubject = await Subject.update({name},{
         where:{
            subject_id
         },
         returning:true,
         plain:true
      })
      return {subject:updatedSubject[1]}
   }
   async deleteSubject({subject_id}){
      const findedSubject = await Subject.findOne({
         where:{
            subject_id
         }
      })
      if(!findedSubject){
         throw new Error("Такой записи не существует")
      }
      const deletedSubject = await Subject.destroy({
         where:{
            subject_id
         },
      })
      return {subject:findedSubject}
   }
   async getSubjects(){
      const findedSubjects = await Subject.findAll()
   
      return {subject:findedSubjects}
   }
}

module.exports = new SubjectRepository()