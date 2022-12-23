const formDataConverter = (body, target) => {
  const obj = { ...body };
  return JSON.parse(obj[target]);
};

module.exports = { formDataConverter };
