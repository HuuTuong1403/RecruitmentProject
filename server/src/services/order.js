const mongoose = require('mongoose');
const Order = require('./../models/orderModel');

exports.updateOrder = async (IDUser, servicePackageId) => {
  const order = await Order.findOne({
    employer: IDUser,
    status: 'Paid',
    servicePackages: {
      $elemMatch: {
        'servicePackage._id': mongoose.Types.ObjectId(servicePackageId),
        'servicePackage.extantQuantity': { $gt: 0 },
      },
    },
  });
  if (!order) {
    return { statusCode: 404, messsage: 'Không tìm thấy đơn hàng' };
  }
  let indexExistservicePackage = -1;
  for (let i = 0; i < order.servicePackages.length; i++) {
    if (order.servicePackages[i].servicePackage._id == servicePackageId) {
      indexExistservicePackage = i;
    }
    if (indexExistservicePackage == -1) {
      return {
        statusCode: 404,
        messsage: 'Không tìm thấy gói dịch vụ với id này',
      };
    }
    newExtantQuantity =
      order.servicePackages[i].servicePackage.extantQuantity - 1;
    const newOrder = await Order.findOneAndUpdate(
      {
        employer: IDUser,
        servicePackages: {
          $elemMatch: {
            'servicePackage._id': order.servicePackages[i].servicePackage._id,
            'servicePackage.extantQuantity': { $gt: 0 },
          },
        },
      },
      {
        'servicePackages.$[orderItem].servicePackage.extantQuantity':
          newExtantQuantity,
      },
      {
        arrayFilters: [
          {
            'orderItem.servicePackage._id':
              order.servicePackages[i].servicePackage._id,
          },
        ],
        new: true,
        runValidators: true,
      }
    );
    if (!newOrder) {
      return {
        statusCode: 404,
        messsage: 'Cập nhật đơn hàng thất bại, không tìm thấy đơn hàng',
      };
    }
    return { statusCode: 200, data: { data: newOrder } };
  }
};
