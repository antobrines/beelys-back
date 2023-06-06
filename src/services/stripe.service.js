const config = require('../config/index');
const stripe = require('stripe')(config.stripe.secret);

const buy = async (req, res) => {
  const customerId = req.user.customerId;
  const productsData = req.body.products;
  const products = [];
  productsData.forEach(async (product, key) => {
    product.priceStripe.forEach(async (price, key) => {
      const element = {
        price: price,
        quantity: product.quantity,
        description: product.name
      };
      products.push(element);
    });
  });
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: products,
    mode: 'payment',
    success_url: config.url_front + '/success',
    cancel_url: config.url_front + '/cancel'
  });
  return session;
};

const createCustomer = async (req, res, next) => {
  const name = req.body.first_name + ' ' + req.body.last_name;
  const customer = await stripe.customers.create({
    email: req.body.email,
    name: name,
    description: null,
  });
  return customer;
};

const createProduct = async (data) => {
  const {
    name,
    price,
    description
  } = data;
  const product = await stripe.products.create({
    name: name,
    type: 'good',
    description: description
  });
  const priceStripe = await stripe.prices.create({
    unit_amount: price * 100,
    currency: 'eur',
    product: product.id,
  });
  product.price_stripe = priceStripe.id;
  return product;
};

const updateProduct = async (data) => {
  const {
    id_stripe,
    name,
    price,
    description,
    price_stripe
  } = data;
  const product = await stripe.products.update(
    id_stripe, {
      name: name,
      description: description
    }
  );
  await stripe.prices.update(price_stripe, {
    active: false
  });
  const priceStripe = await stripe.prices.create({
    unit_amount: price * 100,
    currency: 'eur',
    product: product.id,
  });
  product.price_stripe = priceStripe.id;
  return product;
};

const getInvoice = async (req, res, next) => {
  const customerId = req.user.customerId;
  console.log(customerId);
  const invoices = await stripe.paymentIntents.list({
    customer: customerId,
  });
  const pog = invoices.filter(invoice => invoice.paid === true);
  console.log(pog);
  return invoices;
};



const callBack = async (req, res, next) => {
  return res;
};

module.exports = {
  buy,
  callBack,
  createCustomer,
  createProduct,
  updateProduct,
  getInvoice
};