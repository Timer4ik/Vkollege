const { validationResult } = require("express-validator");
const { Spec } = require("../../models/models");

class SpecController {

    async createSpec(req, res) {

        const { code, name, about } = req.body

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Введены некорректные данные", errors: errors.errors })
        }

        try {

            const createdSpec = await Spec.create({
                code,
                name,
                about
            })

            return res.status(200).json({
                message: "Новая специальность успешно добавлена",
                body: {
                    spec: createdSpec
                }
            })


        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }
    async getSpecs(req, res) {

        let { limit, page } = req.query
        page = page || 1
        limit = limit || 9

        try {
            const offset = page * limit - limit
            const specs = await Spec.findAll({
                limit,
                offset
            })

            return res.status(200).json({
                message: "Специальности успешно получены",
                body: {
                    specs
                }
            })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }
    async getOneSpec(req, res) {
        let { id } = req.params
        try {
            const spec = await Spec.findOne({
                where: {
                    spec_id: id
                }
            })

            return res.status(200).json({
                message: "Специальность успешно получена",
                body: {
                    spec
                }
            })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }
    async deleteSpec(req, res) {

        const { id } = req.params

        try {

            const deletedSpec = await Spec.destroy({
                where: {
                    spec_id: id
                }
            })

            return res.status(200).json({ message: "Специальность успешно удалена" })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }
    async updateSpec(req, res) {

        const { name, code, about } = req.body
        const { id } = req.params

        try {

            const [count, updatedSpec] = await Spec.update({ name, code, about }, {
                where: {
                    spec_id: id
                },
                returning: true
            })

            return res.status(200).json({
                message: "Специальность обновлена",
                body: {
                    spec: updatedSpec[0]
                }
            })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

}

module.exports = new SpecController();