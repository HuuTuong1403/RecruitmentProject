// const ServicePackage = require('./../models/servicePackageModel');
// const Order = require('./../models/orderModel');
// const mongoose = require('mongoose');
// module.exports = async (IDUser, servicePackage, paidPrice, paymentMethods) => {
//   const booking = await Booking.findOne({
//     'servicePackage._id': mongoose.Types.ObjectId(servicePackage.id),
//     'servicePackage.extantQuantity': { $gt: 0 },
//     status: 'Paid',
//     employer: IDUser,
//   });
//   if (!booking) {
//     const newBooking = {
//       servicePackage: servicePackage.id,
//       employer: IDUser,
//       price: servicePackage.price,
//       paidPrice,
//       status: 'Paid',
//       paymentMethods: paymentMethods,
//     };
//     try {
//       const booking = await Booking.create(newBooking);
//       return booking;
//     } catch (err) {
//       return err;
//     }
//   } else {
//     try {
//       const newBooking = await Booking.findByIdAndUpdate(
//         booking.id,
//         {
//           'servicePackage.extantQuantity':
//             booking.servicePackage.extantQuantity +
//             servicePackage.extantQuantity,
//           paymentMethods: paymentMethods,
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       );
//       return newBooking;
//     } catch (err) {
//       return err;
//     }
//   }
// };
