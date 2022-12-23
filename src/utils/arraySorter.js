const getAbsentValues = (arr1, arr2) => {
  return (result = arr1.filter((ele1) => {
    return !arr2.find((ele2) => {
      return ele1 === ele2;
    });
  }));
};

module.exports = { getAbsentValues };
