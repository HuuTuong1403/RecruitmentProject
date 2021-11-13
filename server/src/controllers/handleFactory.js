const mongoose = require('mongoose');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('Không tìm thấy dữ liệu với id này', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
exports.softDeleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const idUser = mongoose.Types.ObjectId(`${req.user.id}`);
    await Model.delete({ _id: req.params.id }, idUser);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
exports.restoreOne = (Model) =>
  catchAsync(async (req, res, next) => {
    await Model.restore({ _id: req.params.id });
    res.status(200).json({
      status: 'success',
      message: 'Khôi phục tài liệu thành công',
    });
  });
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError('Không tìm thấy dữ liệu với id này', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { data: doc },
    });
  });
exports.getOne = (Model, popOtions, fields) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (popOtions) query = query.populate(popOtions);
    if (fields) {
      fields = fields.split(',').join(' ');
      query = query.select(fields);
    }
    const doc = await query;
    if (!doc) {
      return next(new AppError('Không tìm thấy dữ liệu với id này', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
exports.getOneUniqueField = (Model, popOtions, fields) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findOne(req.params);
    if (popOtions) query = query.populate(popOtions);
    if (fields) {
      fields = fields.split(',').join(' ');
      query = query.select(fields);
    }
    const doc = await query;
    if (!doc) {
      return next(new AppError('Không tìm thấy dữ liệu với id này', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
exports.getAll = (Model, ModelName) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    var re = undefined;

    if (req.query.companyName && (ModelName == 'Job' || ModelName == 'Event')) {
      var re = new RegExp(`${req.query.companyName}`, 'gi');
      req.query.companyName = undefined;
    }

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    let docs = await features.query;

    if (re) {
      docs = docs.filter((doc) => {
        if (re.test(doc.company.companyName)) {
          return doc;
        }
      });
    }
    //Send response
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });
exports.getDeletedAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const docs = await Model.findWithDeleted({ deleted: true });
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });
exports.getDeletedOne = (Model, popOtions, fields) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findOneWithDeleted({ _id: req.params.id, deleted: true });
    if (popOtions) query = query.populate(popOtions);
    if (fields) {
      fields = fields.split(',').join(' ');
      query = query.select(fields);
    }
    const doc = await query;
    if (!doc) {
      return next(new AppError('Không tìm thấy dữ liệu với id này', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
