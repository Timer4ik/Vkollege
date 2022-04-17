const {Spec} = require("../../models/models.js")


class SpecRepository {
   async createSpec({code,name,about}){
      const newSpec = await Spec.create({
         code,name,about
      })
      return {spec:newSpec}
   }
   async updateSpec({code,name,about,spec_id}){
      const findedSpec = await Spec.findOne({
         where:{
            spec_id
         }
      })
      if(!findedSpec){
         throw new Error("Такой записи не существует")
      }
      const updatedSpec = await Spec.update({code,name,about},{
         where:{
            spec_id
         },
         returning:true,
         plain:true
      })
      return {spec:updatedSpec[1]}
   }
   async deleteSpec({spec_id}){
      const findedSpec = await Spec.findOne({
         where:{
            spec_id
         }
      })
      if(!findedSpec){
         throw new Error("Такой записи не существует")
      }
      const deletedSpec = await Spec.destroy({
         where:{
            spec_id
         },
      })
      return {spec:findedSpec}
   }
   async getSpecs(){
      const findedSpecs = await Spec.findAll()
   
      return {specs:findedSpecs}
   }
}

module.exports = new SpecRepository()