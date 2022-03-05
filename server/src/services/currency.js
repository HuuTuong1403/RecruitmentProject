const axios = require('axios');
exports.VNDtoUSDExchange = async (amount) => {
  var options = {
    method: 'GET',
    url: `https://v6.exchangerate-api.com/v6/${process.env.API_KEY_CURRENCY}/latest/VND`,
  };
  const response = await axios.request(options);
  return (amount * response.data.conversion_rates.USD).toFixed();
};
exports.VNDtoEURExchange = async (amount) => {
  var options = {
    method: 'GET',
    url: `https://v6.exchangerate-api.com/v6/${process.env.API_KEY_CURRENCY}/latest/VND`,
  };
  const response = await axios.request(options);
  return (amount * response.data.conversion_rates.EUR).toFixed();
};
