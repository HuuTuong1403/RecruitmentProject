const axios = require('axios');

class locationController {
  getProvince = async (req, res) => {
    try {
      const result = await axios.get(`https://provinces.open-api.vn/api/p/`);
      const provinces = result.data;
      res.status(200).json({
        status: 'success',
        length: provinces.length,
        data: {
          province: provinces,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: 'fail',
        message: err,
      });
    }
  };
  getDistrict = async (req, res) => {
    if (req.query.code) {
      try {
        const result = await axios.get(
          `https://provinces.open-api.vn/api/p/${req.query.code}?depth=2`
        );
        const province = result.data;
        const districts = province.districts;
        res.status(200).json({
          status: 'success',
          length: districts.length,
          data: {
            district: districts,
          },
        });
      } catch (err) {
        console.log(err);
        res.status(400).json({
          status: 'fail',
          message: err,
        });
      }
    }
    return res.status(400).json({
      status: 'fail',
      message: 'You must have a province code',
    });
  };
  getWard = async (req, res) => {
    if (req.query.code) {
      try {
        const result = await axios.get(
          `https://provinces.open-api.vn/api/d/${req.query.code}?depth=2`
        );
        const district = result.data;
        const wards = district.wards;
        res.status(200).json({
          status: 'success',
          length: wards.length,
          data: {
            ward: wards,
          },
        });
      } catch (err) {
        console.log(err);
        res.status(400).json({
          status: 'fail',
          message: err,
        });
      }
    }
    return res.status(400).json({
      status: 'fail',
      message: 'You must have a district code',
    });
  };
}
module.exports = new locationController();
