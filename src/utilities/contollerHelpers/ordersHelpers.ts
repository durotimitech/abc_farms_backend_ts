import { dataSource } from "../../services/database";
import { Product as ProductEntity } from "../../api/entities";
import { NotFoundError } from "../errors";

export const checkProduct = async (id:number) => {
    const Product = dataSource.getRepository(ProductEntity);

    const product = await Product.findOne({where: {id}});

    if (!product) {
        throw new NotFoundError("Product not found");
    }

    return product;
};

export const checkProductQuantity = async (id:number, quantity:number) => {
    const Product = dataSource.getRepository(ProductEntity);

    const product = await Product.findOne({where: {id}});

    if (product.productQuantity < quantity) {
        throw new NotFoundError("Product quantity is less than what is available");
    }

    return true;

};

export const calculateOrderTotal = async (id:number, quantity:number) => {
    const Product = dataSource.getRepository(ProductEntity);

    const product = await Product.findOne({where: {id}});

    const total = quantity * product.productPrice;

    return total;
};

// export const placeOrder = async (user_id, item, orderTotal, deliveryMethod, paymentMethod) => {
//     const Product = dataSource.getRepository(ProductEntity);
//     const User = dataSource.getRepository(UserEntity);

//     const user = await User.findOne({ where: { id:user_id } });

//     const data = {
//         userId: user_id,
//         customerName: user.firstname + " " + user.lastname,
//         customerPhone: user.telephone,
//         customerEmail: user.email,
//         deliveryMethod,
//         productId: item.productId,
//         quantity: item.quantity,
//         total: orderTotal,
//         paymentMethod
//     };





// // Place Order
// const placeOrder = async (item, orderTotal, req, res) => {
//   try {
//     const data = {
//       userId: req.user.userId,
//       customerName: req.body.customerName,
//       customerPhone: req.body.customerPhone,
//       customerEmail: req.user.email,
//       deliveryMethod: req.body.deliveryMethod,
//       productId: item.productId,
//       quantity: item.quantity,
//       total: orderTotal,
//       orderStatus: JSON.stringify([
//         {
//           orderStatus: "pending",
//           updatedAt: getDate(),
//         },
//       ]),
//       paymentMethod: req.body.paymentMethod,
//       createdAt: getDate(),
//       updatedAt: getDate(),
//     };

//     const order = await Queries.insertOne({ table: "orders", data });
//     return order.insertId;
//   } catch (e) {
//     return _response({ statusCode: 500, res, result: e });
//   }
// };