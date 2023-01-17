const Joi = require("joi");
const schema = Joi.object().keys({
  Gateway: Joi.string().required(),
  UID: Joi.number().required(),
  Vendor: [Joi.string().optional(), Joi.allow(null), Joi.allow("")],
  OnlineStatus: Joi.boolean().required(),
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
