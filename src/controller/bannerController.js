const Banner = require("../model/Banners")
const bannerController = {
    addBanner: async (req, res) => {
        try {
            const brandTest = await Banner.find()
            let id
            do {
                id = Math.floor(Math.random() * 100000000) + 1;
            } while (brandTest.includes(id))
            const bannerID = `BN${id}`
            const banner = await new Banner({
                id: bannerID,
                targetScreen: req.body.targetScreen,
                imageUrl: req.body.imageUrl,
            })
            const newBanner = await banner.save()
            res.status(200)
            res.json({
                _id: newBanner.id,
                data: newBanner
            })
        } catch (err) {
            res.json(err)
            res.status(500)
        }
    },
    getBanner: async (req, res) => {
        try {
            const banner = await Banner.find(req.params.id)
            if (!banner) {
                return res.status(404).json({ message: "banner not found" })
            }
            res.status(200)
            res.json({ data: banner })
        }
        catch (err) {
            res.json(err)
            res.status(500)
        }
    },
    getAllBanner: async (req, res) => {
        try {
            const banner = await Banner.find()
            res.status(200)
            res.json({ data: banner })
        } catch (err) {
            res.json(err)
            res.status(500)
        }
    },
    updateBanner: async (req, res) => {
        try {
            const banner = await Banner.findByIdAndUpdate(req.params.id, req.bod, { new: true })
            if (!banner) {
                return res.status(404).json({ message: "banner not found" })
            }
            res.status(200)
            res.json({ data: banner })
        } catch (err) {
            res.json(err)
            res.status(500)
        }
    },
    deleteBanner: async (req, res) => {
        try {
            const banner = await Banner.findByIdAndDelete(req.params.id)
            if (!banner) {
                return res.status(404).json({ message: "banner not found" })
            }
            res.status(200)
            res.json({ data: banner })
        }
        catch (err) {
            res.json(err)
            res.status(500)
        }
    }
}

module.exports = bannerController