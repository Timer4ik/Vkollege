const StudyPlanRepository = require("./StudyPlanRepository.js")


class StudyPlanController {
   async createStudyPlan(req, res) {
      const data = req.body
      try {
         const {study_plan} = await StudyPlanRepository.createStudyPlan(data)
         return res.json({message:"Новая запись успешно добавлена",body:{
            study_plan
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
   async updateStudyPlan(req, res) {
      const data = req.body
      const {study_plan_id} = req.params
      try {
         const {study_plan} = await StudyPlanRepository.updateStudyPlan({...data,study_plan_id})
         return res.json({message:"Запись успешно изменена",body:{
            study_plan
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
   async deleteStudyPlan(req, res) {
      const {study_plan_id} = req.params
      try {
         const {study_plan} = await StudyPlanRepository.deleteStudyPlan({study_plan_id})
         return res.json({message:"Запись успешно удалена",body:{
            study_plan
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
   async getStudyPlans(req, res) {
      try {
         const {study_plan} = await StudyPlanRepository.getStudyPlans()
         return res.json({message:"Все записи успешно получены",body:{
            study_plan
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
}

module.exports = new StudyPlanController()