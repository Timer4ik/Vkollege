const StudyPlanRepository = require("./StudyPlanRepository.js")


class StudyPlanController {
   async createStudyPlan(req, res) {
      const data = req.body
      try {
         const {studyPlan} = await StudyPlanRepository.createStudyPlan(data)
         return res.json({message:"Новая запись успешно добавлена",body:{
            studyPlan
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
   async updateStudyPlan(req, res) {
      const data = req.body
      const {study_plan_id} = req.params
      try {
         const {studyPlan} = await StudyPlanRepository.updateStudyPlan({...data,study_plan_id})
         return res.json({message:"Запись успешно изменена",body:{
            studyPlan
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
   async deleteStudyPlan(req, res) {
      const {study_plan_id} = req.params
      try {
         const {studyPlan} = await StudyPlanRepository.deleteStudyPlan({study_plan_id})
         return res.json({message:"Запись успешно удалена",body:{
            studyPlan
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
   async getStudyPlans(req, res) {
      try {
         const {studyPlan} = await StudyPlanRepository.getStudyPlans()
         return res.json({message:"Все записи успешно получены",body:{
            studyPlan
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
}

module.exports = new StudyPlanController()