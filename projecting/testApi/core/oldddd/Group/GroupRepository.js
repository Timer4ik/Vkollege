const {Group} = require("../../models/models.js")


class GroupRepository {
   async createGroup({year}){
      const newGroup = await Group.create({
         year
      })
      return {group:newGroup}
   }
   async updateGroup({year,group_id}){
      const findedGroup = await Group.findOne({
         where:{
            group_id
         }
      })
      if(!findedGroup){
         throw new Error("Такой записи не существует")
      }
      const updatedGroup = await Group.update({year},{
         where:{
            group_id
         },
         returning:true,
         plain:true
      })
      return {group:updatedGroup[1]}
   }
   async deleteGroup({group_id}){
      const findedGroup = await Group.findOne({
         where:{
            group_id
         }
      })
      if(!findedGroup){
         throw new Error("Такой записи не существует")
      }
      const deletedGroup = await Group.destroy({
         where:{
            group_id
         },
      })
      return {group:findedGroup}
   }
   async getGroups(){
      const findedGroups = await Group.findAll()
   
      return {groups:findedGroups}
   }
}

module.exports = new GroupRepository()