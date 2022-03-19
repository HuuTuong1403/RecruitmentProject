const factory = require('./handleFactory');
const Service = require('./../models/serviceModel');

class ServiceController {
  createService = factory.createOne(Service);
  updateService = factory.updateOne(Service);
  softDeleteService = factory.softDeleteOne(Service);
  getAllDeletedService = factory.getDeletedAll(Service);
  getDeletedService = factory.getDeletedOne(Service);
  restoreService = factory.restoreOne(Service);
  getAllService = factory.getAll(Service);
  getService = factory.getOne(Service);
  deleteService = factory.deleteOne(Service);
}
module.exports = new ServiceController();
