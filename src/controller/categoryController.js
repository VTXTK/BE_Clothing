const Category = require("../model/Categories")
const categoryController = {
    addCategory: async (req, res) => {
        try {
            const categoryTest = await Category.find()
            let id
            do {
                id = Math.floor(Math.random() * 100000000) + 1;
            } while (categoryTest.includes(id))
            const categoryID = `CA${id}`
            const category = await new Category({
                id: categoryID,
                nameCategory: req.body.nameCategory,
                image: req.body.image,
                parentId: req.body?.parentId || ""
            })
            const newCategory = await category.save()
            res.status(200)
            res.json({
                _id: newCategory.id,
                data: newCategory
            })
        }
        catch (err) {
            res.json(err)
            res.status(500)
        }
    },
    getCategory: async (req, res) => {
        try {
            const category = await Category.find(req.params.id)
            if (!category) {
                return res.status(404).json({ message: "Category not found" })
            }
            res.status(200)
            res.json({ data: category })
        }
        catch (err) {
            res.json(err)
            res.status(500)
        }
    },
    getAllCategory: async (req, res) => {
        try {
            const categorys = await Category.find()
            if (!categorys) {
                return res.status(404).json({ message: "Category not found" })
            }
            res.status(200)
            res.json({ data: categorys })
        }
        catch {
            res.json(err)
            res.status(500)
        }
    },
    updateCategory: async (req, res) => {
        try {
            const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
            if (!category) {
                return res.status(404).json({ message: "Category not found" })
            }
        }
        catch (err) {
            res.json(err)
            res.status(500)
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const category = await Category.findByIdAndRemove(req.params.id)
            if (!category) {
                return res.status(404).json({ message: "Category not found" })
            }
            res.status(200)
            res.json({ data: category })

        } catch (err) {
            res.json(err)
            res.status(500)
        }
    }
}
module.exports = categoryController