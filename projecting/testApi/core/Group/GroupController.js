const GroupRepository = require("./GroupRepository.js")


class GroupController {
   async createGroup(req, res) {
      const data = req.body
      try {
         const {group} = await GroupRepository.createGroup(data)
         return res.json({message:"Новая запись успешно добавлена",body:{
            group
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
   async updateGroup(req, res) {
      const data = req.body
      const {group_id} = req.params
      try {
         const {group} = await GroupRepository.updateGroup({...data,group_id})
         return res.json({message:"Запись успешно изменена",body:{
            group
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
   async deleteGroup(req, res) {
      const {group_id} = req.params
      try {
         const {group} = await GroupRepository.deleteGroup({group_id})
         return res.json({message:"Запись успешно удалена",body:{
            group
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
   async getGroups(req, res) {
      try {
         const {groups} = await GroupRepository.getGroups()
         return res.json({message:"Все записи успешно получены",body:{
            groups
         }})
      } catch (error) {
         return res.status(400).json({message:error.message,error})
      }
   }
}

module.exports = new GroupController()