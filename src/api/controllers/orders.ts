// import logger from "../../utilities/logger";
// import {Request, Response} from "express";
// import { calculateOrderTotal, checkProduct, checkProductQuantity } from "../../utilities/contollerHelpers/ordersHelpers";

// export const postOrder = async (req:Request, res:Response) => {
//     logger.info("Initiating post order process");

    // const orderItems = JSON.parse(req.body.orderItems);

    // const orderIds = await Promise.all(
    //     orderItems.map(async (item) => {
    //         const product = await checkProduct(item);
    //         checkProductQuantity(item.id, item.quantity);
    //         const orderTotal = calculateOrderTotal(item.id, item.quantity);
    //         const orderId = await placeOrder(item, orderTotal, req, res);
    //         await updateProductQuantity(item, product, res);
    //         sendEmail({
    //             emails: [req.user.email, process.env.EMAIL],
    //             subject: "Your order has been confirmed",
    //             emailType: "order create",
    //             content: {},
    //         });

    //         return orderId;

    //     })
    // );

    // }


// (POST) create a new order
// exports.postOrder = async (req, res, next) => {
//   const orderItems = JSON.parse(req.body.orderItems);

//   const orderId = await Promise.all(
//     orderItems.map(async (item) => {
//       const product = await getProduct(item, res);
//       checkQuantity(item, product, res);
//       const orderTotal = calculateOrderTotal(item, product);
//       const orderId = await placeOrder(item, orderTotal, req, res);
//       await updateProductQuantity(item, product, res);
//       sendEmail({
//         emails: [req.user.email, process.env.EMAIL],
//         subject: "Your order has been confirmed",
//         emailType: "order create",
//         content: {},
//       });

//       return orderId;
//     })
//   );
//   _response({
//     statusCode: 201,
//     res,
//     result: { orderIds: orderId },
//   });
// };

// // (GET) retrieve users orders
// exports.getOrders = async (req, res, next) => {
//   try {
//     const orders = await Queries.selectAllFromJoin2With1conditionAndOrder({
//       table1: "orders",
//       table2: "products",
//       joint1: "productId",
//       condition: { userId: req.user.userId },
//       orderBy: "orders.createdAt",
//       direction: "DESC",
//     });

//     const result = {
//       count: orders.length,
//       orders,
//     };

//     _response({ statusCode: 200, res, result });
//   } catch (e) {
//     _response({ statusCode: 500, res, result: e });
//   }
// };

// // (GET) retrieve all orders
// exports.getAllOrders = async (req, res, next) => {
//   try {
//     const orders = await Queries.selectAllFromJoin2AndOrder({
//       table1: "orders",
//       table2: "products",
//       joint1: "productId",
//       orderBy: "orders.createdAt",
//       direction: "DESC",
//     });

//     const result = {
//       count: orders.length,
//       orders,
//     };

//     _response({ statusCode: 200, res, result });
//   } catch (e) {
//     _response({ statusCode: 500, res, result: e });
//   }
// };

// // (GET) retrieve single order
// exports.getSingleOrder = async (req, res, next) => {
//   try {
//     const admins = [accessLevels.ADMIN, accessLevels.SALESMAN];
//     // Allow salesman get any order
//     if (admins.includes(req.user.accessLevel)) {
//       const result = (
//         await Queries.selectColumnsFromJoin3With1condition({
//           table1: "orders",
//           table2: "products",
//           table3: "users",
//           joint1: "productId",
//           joint2: "userId",
//           columns: [
//             "orders.createdAt",
//             "orders.updatedAt",
//             "orderId",
//             "orderStatus",
//             "quantity",
//             "total",
//             "paymentMethod",
//             "orders.productId",
//             "productTitle",
//             "productPrice",
//             "productImageUrl",
//             "orders.userId",
//             "customerName",
//             "email",
//             "phone",
//           ],
//           condition: { orderId: req.params.orderId },
//         })
//       )[0];
//       return _response({ statusCode: 200, res, result });
//     }

//     return _response({
//       statusCode: 403,
//       res,
//       result: "You are not authorized to view this page!",
//     });
//   } catch (e) {
//     return _response({ statusCode: 500, res, result: e });
//   }
// };

// // (UPDATE) order
// exports.updateOrder = async (req, res, next) => {
//   try {
//     const admins = [accessLevels.ADMIN, accessLevels.SALESMAN];
//     const data = {
//       orderStatus: req.body.orderStatus,
//       updatedAt: getDate(),
//     };

//     // Allow salesman update any order
//     if (admins.includes(req.user.accessLevel)) {
//       await Queries.updateOne({
//         table: "orders",
//         data,
//         condition: { orderId: req.body.orderId },
//       });
//       return _response({ statusCode: 200, res, result: "success" });
//     }

//     return _response({
//       statusCode: 403,
//       res,
//       result: "You are not authorized to view this page!",
//     });
//   } catch (e) {
//     return _response({ statusCode: 500, res, result: e });
//   }
// };








// // Update product quantity
// const updateProductQuantity = async (item, product, res) => {
//   try {
//     const data = {
//       productQuantity: product.productQuantity - item.quantity,
//     };

//     await Queries.updateOne({
//       table: "products",
//       condition: { productId: item.productId },
//       data,
//     });
//   } catch (e) {
//     _response({ statusCode: 500, res, result: e });
//   }
// };

