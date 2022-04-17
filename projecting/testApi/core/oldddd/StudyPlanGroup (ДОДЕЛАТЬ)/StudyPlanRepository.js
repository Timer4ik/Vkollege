const {StudyPlan} = require("../../models/models.js")


class StudyPlanRepository {
   async createStudyPlan({year}){
      const newStudyPlan = await StudyPlan.create({
         year
      })
      return {study_plan_group:newStudyPlan}
   }
   async updateStudyPlan({year,study_plan_id}){
      const findedStudyPlan = await StudyPlan.findOne({
         where:{
            study_plan_id
         }
      })
      if(!findedStudyPlan){
         throw new Error("Такой записи не существует")
      }
      const updatedStudyPlan = await StudyPlan.update({year},{
         where:{
            study_plan_id
         },
         returning:true,
         plain:true
      })
      return {study_plan_group:updatedStudyPlan[1]}
   }
   async deleteStudyPlan({study_plan_id}){
      const findedStudyPlan = await StudyPlan.findOne({
         where:{
            study_plan_id
         }
      })
      if(!findedStudyPlan){
         throw new Error("Такой записи не существует")
      }
      const deletedStudyPlan = await StudyPlan.destroy({
         where:{
            study_plan_id
         },
      })
      return {study_plan_group:findedStudyPlan}
   }
   async getStudyPlans(){
      const findedStudyPlans = await StudyPlan.findAll()
   
      return {study_plan_group:findedStudyPlans}
   }
}

module.exports = new StudyPlanRepository()