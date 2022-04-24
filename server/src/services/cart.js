const mongoose = require('mongoose');
const Cart = require('../models/cartModel');
const Order = require('./../models/orderModel');
exports.createCart = async (IDUser, servicePackage, paidPrice) => {
  const cart = await Cart.findOne({
    employer: IDUser,
  });
  if (!cart) {
    const newCart = {
      servicePackages: {
        quantity: 1,
        servicePackage: servicePackage.id,
      },
      employer: IDUser,
      price: servicePackage.price,
      paidPrice,
    };
    try {
      const cart = await Cart.create(newCart);
      return { statusCode: 201, data: { data: cart } };
    } catch (err) {
      return {
        statusCode: 500,
        messsage: 'Có lỗi xảy ra trong quá trình tạo giỏ hàng',
      };
    }
  } else {
    let indexExistservicePackage = -1;
    for (let i = 0; i < cart.servicePackages.length; i++) {
      if (cart.servicePackages[i].servicePackage._id == servicePackage.id) {
        indexExistservicePackage = i;
        break;
      }
    }
    if (indexExistservicePackage >= 0) {
      newPaidPrice = {
        VND: cart.paidPrice.VND + paidPrice.VND,
        USD: cart.paidPrice.USD + paidPrice.USD,
        EUR: cart.paidPrice.EUR + paidPrice.EUR,
      };
      newPrice = {
        VND: cart.price.VND + servicePackage.price.VND,
        USD: cart.price.USD + servicePackage.price.USD,
        EUR: cart.price.EUR + servicePackage.price.EUR,
      };
      const newCart = await Cart.findOneAndUpdate(
        {
          employer: IDUser,
          servicePackages: {
            $elemMatch: {
              'servicePackage._id':
                cart.servicePackages[indexExistservicePackage].servicePackage
                  ._id,
            },
          },
        },
        {
          'servicePackages.$[cartItem].servicePackage.extantQuantity':
            cart.servicePackages[indexExistservicePackage].servicePackage
              .extantQuantity + servicePackage.extantQuantity,
          'servicePackages.$[cartItem].quantity':
            cart.servicePackages[indexExistservicePackage].quantity + 1,
          price: newPrice,
          totalQuantity: cart.totalQuantity + 1,
          paidPrice: newPaidPrice,
        },
        {
          arrayFilters: [
            {
              'cartItem.servicePackage._id':
                cart.servicePackages[indexExistservicePackage].servicePackage
                  ._id,
            },
          ],
          new: true,
          runValidators: true,
        }
      );
      return { statusCode: 201, data: { data: newCart } };
    } else {
      newPaidPrice = {
        VND: cart.paidPrice.VND + paidPrice.VND,
        USD: cart.paidPrice.USD + paidPrice.USD,
        EUR: cart.paidPrice.EUR + paidPrice.EUR,
      };
      newPrice = {
        VND: cart.price.VND + servicePackage.price.VND,
        USD: cart.price.USD + servicePackage.price.USD,
        EUR: cart.price.EUR + servicePackage.price.EUR,
      };
      const newCart = await Cart.findOneAndUpdate(
        {
          employer: IDUser,
        },
        {
          $push: {
            servicePackages: {
              quantity: 1,
              servicePackage: servicePackage,
            },
          },
          price: newPrice,
          totalQuantity: cart.totalQuantity + 1,
          paidPrice: newPaidPrice,
        },
        { new: true, runValidators: true }
      );
      return { statusCode: 201, data: { data: newCart } };
    }
  }
};
exports.updateCartItem = async (IDUser, servicePackageId, quantity) => {
  if (quantity == 0) {
    return this.deleteCartItem(IDUser, servicePackageId);
  }
  const cart = await Cart.findOne({
    employer: IDUser,
  });
  if (!cart) {
    return { statusCode: 404, messsage: 'Không tìm thấy giỏ hàng' };
  } else {
    let indexExistservicePackage = -1;
    totalQuantity = 0;
    for (let i = 0; i < cart.servicePackages.length; i++) {
      if (cart.servicePackages[i].servicePackage._id == servicePackageId) {
        indexExistservicePackage = i;
      }
      totalQuantity = totalQuantity + cart.servicePackages[i].quantity;
    }
    if (indexExistservicePackage == -1) {
      return {
        statusCode: 404,
        messsage: 'Không tìm thấy gói dịch vụ với id này',
      };
    }
    newPrice = {
      VND:
        cart.servicePackages[indexExistservicePackage].servicePackage.price
          .VND * quantity,
      USD:
        cart.servicePackages[indexExistservicePackage].servicePackage.price
          .USD * quantity,
      EUR:
        cart.servicePackages[indexExistservicePackage].servicePackage.price
          .EUR * quantity,
    };
    const newCart = await Cart.findOneAndUpdate(
      {
        employer: IDUser,
        servicePackages: {
          $elemMatch: {
            'servicePackage._id':
              cart.servicePackages[indexExistservicePackage].servicePackage._id,
          },
        },
      },
      {
        'servicePackages.$[cartItem].servicePackage.extantQuantity':
          cart.servicePackages[indexExistservicePackage].servicePackage
            .extantQuantity * quantity,
        'servicePackages.$[cartItem].quantity': quantity,
        price: newPrice,
        totalQuantity:
          totalQuantity -
          cart.servicePackages[indexExistservicePackage].quantity +
          quantity,
        paidPrice: newPrice,
      },
      {
        arrayFilters: [
          {
            'cartItem.servicePackage._id':
              cart.servicePackages[indexExistservicePackage].servicePackage._id,
          },
        ],
        new: true,
        runValidators: true,
      }
    );
    return { statusCode: 200, data: { data: newCart } };
  }
};
exports.deleteCartItem = async (IDUser, servicePackageId) => {
  const cart = await Cart.findOne({
    employer: IDUser,
  });
  if (!cart) {
    return { statusCode: 404, messsage: 'Không tìm thấy giỏ hàng' };
  } else {
    let indexExistservicePackage = -1;
    for (let i = 0; i < cart.servicePackages.length; i++) {
      if (cart.servicePackages[i].servicePackage._id == servicePackageId) {
        indexExistservicePackage = i;
        break;
      }
    }
    if (indexExistservicePackage == -1) {
      return {
        statusCode: 404,
        messsage: 'Không tìm thấy gói dịch vụ với id này',
      };
    } else {
      if (cart.servicePackages.length == 1) {
        return this.deleteCart(IDUser);
      }
      newPrice = {
        VND:
          cart.price.VND -
          cart.servicePackages[indexExistservicePackage].servicePackage.price
            .VND *
            cart.servicePackages[indexExistservicePackage].quantity,
        USD:
          cart.price.USD -
          cart.servicePackages[indexExistservicePackage].servicePackage.price
            .USD *
            cart.servicePackages[indexExistservicePackage].quantity,
        EUR:
          cart.price.EUR -
          cart.servicePackages[indexExistservicePackage].servicePackage.price
            .EUR *
            cart.servicePackages[indexExistservicePackage].quantity,
      };
      const newCart = await Cart.findOneAndUpdate(
        {
          employer: IDUser,
        },
        {
          $pull: {
            servicePackages: {
              'servicePackage._id': mongoose.Types.ObjectId(servicePackageId),
            },
          },
          price: newPrice,
          totalQuantity:
            cart.totalQuantity -
            cart.servicePackages[indexExistservicePackage].quantity,
          paidPrice: newPrice,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      return { statusCode: 200, data: { data: newCart } };
    }
  }
};
exports.deleteCart = async (IDUser) => {
  const cart = await Cart.findOneAndDelete({ employer: IDUser });
  if (!cart) {
    return { statusCode: 404, messsage: 'Không tìm thấy giỏ hàng' };
  }
  return { statusCode: 204, messsage: 'Xóa giỏ hàng thành công' };
};
exports.getCart = async (IDUser) => {
  const cart = await Cart.findOne({ employer: IDUser });
  if (!cart) {
    return { statusCode: 404, messsage: 'Không tìm thấy giỏ hàng' };
  }
  return { statusCode: 200, data: { data: cart } };
};
exports.checkoutCart = async (IDUser) => {
  const cart = await Cart.findOne({ employer: IDUser });
  if (!cart) {
    return { statusCode: 404, messsage: 'Không tìm thấy giỏ hàng' };
  }
  const order = {
    servicePackages: cart.servicePackages,
    employer: IDUser,
    price: cart.price,
    paidPrice: cart.paidPrice,
    status: 'NotPaid',
  };
  try {
    const newOrder = await Order.create(order);
    this.deleteCart(IDUser);
    return { statusCode: 201, data: { data: newOrder } };
  } catch (err) {
    return {
      statusCode: 500,
      messsage: 'Có lỗi xảy ra trong quá trình tạo thanh toán',
    };
  }
};
