function customOrderIdgenerator(lastOrderDate) {
  const thisDate = new Date();
  let day = thisDate.getDate();
  let month = thisDate.getMonth() + 1;
  const year = thisDate.getFullYear();

  if (day < 10) {
    day = `0${day}`;
  }

  if (month < 10) {
    month = `0${month}`;
  }

  if (!lastOrderDate) {
    return `ABC${day}${month}${year}-001`;
  }

  let orderNumber = +lastOrderDate.slice(-3) + 1;

  if (orderNumber < 10) {
    orderNumber = `00${orderNumber}`;
  } else if (orderNumber < 100) {
    orderNumber = `0${orderNumber}`;
  }

  if (+lastOrderDate.slice(3, 5) < +day) {
    orderNumber = `001`;
  }

  if (+lastOrderDate.slice(5, 7 < +month)) {
    orderNumber = `001`;
  }

  // console.log(+lastOrderDate.slice(5, 7), +month);

  const customOrderId = `ABC${day}${month}${year}-${orderNumber}`;

  return customOrderId;
}

module.exports = customOrderIdgenerator;
