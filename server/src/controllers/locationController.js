const axios = require('axios');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

class locationController {
  getProvince = catchAsync(async (req, res, next) => {
    const result = await axios.get(`https://provinces.open-api.vn/api/p/`);
    const provinces = result.data;
    res.status(200).json({
      status: 'success',
      length: provinces.length,
      data: {
        province: provinces,
      },
    });
  });
  getDistrict = catchAsync(async (req, res, next) => {
    if (req.query.code) {
      const result = await axios.get(
        `https://provinces.open-api.vn/api/p/${req.query.code}?depth=2`
      );
      const province = result.data;
      const districts = province.districts;
      return res.status(200).json({
        status: 'success',
        length: districts.length,
        data: {
          district: districts,
        },
      });
    }
    return next(new AppError('Province code is required'));
  });
  getWard = catchAsync(async (req, res, next) => {
    if (req.query.code) {
      const result = await axios.get(
        `https://provinces.open-api.vn/api/d/${req.query.code}?depth=2`
      );
      const district = result.data;
      const wards = district.wards;
      return res.status(200).json({
        status: 'success',
        length: wards.length,
        data: {
          ward: wards,
        },
      });
    }
    return next(new AppError('District code is required'));
  });
}
module.exports = new locationController();
