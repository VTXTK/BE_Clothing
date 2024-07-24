const Order = require("../model/Orders")
const orderController = {
    createOrder: async (req, res) => {
        try {
            const orderTest = await Order.find()
            let id
            do {
                id = Math.floor(Math.random() * 100000000) + 1;
            } while (orderTest.includes(id))
            const orderId = `HD${id}`
            const newOrder = new Order({
                orderId: orderId,
                idUser: req.body.idUser,
                address: req.body.address,
                totalPrice: req.body.totalPrice,
                detail: req.body.detail
            })
            const order = await new newOrder.save()
            res.status(200).json({
                _id: order.id,
                data: order
            })
        } catch (err) {
            res.json(err)
            res.status(500)
        }
    },
    getAllOrder: async (req, res) => {
        try {
            const params = apiQueryParams(req.query);
            console.log('pargema', params)
            const filter = {}
            if (params?.filter?.idUser) {
                filter.idUser = params?.filter?.idUser
            }
            if (params?.filter?.state) {
                filter.state = params?.filter?.state
            }
            // if (params.filter.name) {
            //     filter.name = { $regex: params.filter.name, $options: 'i' }
            // }
            // if (params.filter.phone) {
            //     filter.phone = { $regex: params.filter.phone, $options: 'i' }
            // }

            if (params.filter.createdAt) {

                const dateString = params.filter.createdAt; // '12/11/2023'

                // Parse chuỗi sang đối tượng Date
                const date = moment(dateString, 'DD/MM/YYYY').toDate();

                // Lấy ngày bắt đầu khoảng là 0h ngày được chọn 
                const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());

                // Lấy ngày kết thúc khoảng là 0h ngày tiếp theo
                const end = new Date(start.getTime());
                end.setDate(start.getDate() + 1);

                // Convert cả 2 ngày về định dạng ISODate cho MongoDB
                filter.createdAt = {
                    $gte: start.toISOString(),
                    $lt: end.toISOString()
                };

            }
            // const sort = params.sort || '-updatedAt';
            const order = await Order.find(filter).sort('-createdAt').exec()
            if (order) {
                return res.status(200).json({ data: order })
            }
            else {
                return res.status(404).json({ message: 'Không tồn tại đơn hàng nào' })
            }
        } catch (error) {
            res.json(error)
            res.status(500)
        }
    },
    deleteOrder: async (req, res) => {
        try {
            const order = await Order.findByIdAndDelete(req.params.id)
            if (order) {
                return res.status(200).json({ data: order })
            }
            else {
                return res.status(404).json({ message: 'Không tồn tại đơn hàng' })
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getDetailOrder: async (req, res) => {
        try {
            const order = await Order.findById(req.params.id)
            if (order) {
                return res.status(200).json({ data: order })
            }
            else {
                return res.status(404).json({ message: 'Không tồn tại đơn hàng' })
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },
    updateOrder: async (req, res) => {
        try {
            const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
            if (order) {
                return res.status(200).json({ data: order })
            }
            else {
                return res.status(404).json({ message: 'Không tồn tại đơn hàng' })
            }

        } catch (error) {
            return res.status(500).json(error)
        }
    }
}
module.exports = orderController