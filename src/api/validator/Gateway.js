const Joi = require("joi");
const schema = Joi.object().keys({
  SerialNumber: Joi.string().required(),
  Name: [Joi.string().optional(), Joi.allow(null), Joi.allow("")],
  IPV4Address: Joi.string()
    .ip({ version: ["ipv4"] })
    .required(),
});

exports.createOrUpdate = async (req, res, next) => {
  try {
    const validate = schema.validate(req.body);
    if (validate.error) {
      res.status(400).json({ success: false, message: validate.error.details });
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
    next();
  }
};
