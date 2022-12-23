const Joi = require('joi');

const createUser = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string()
      .required()
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'))
      .messages({
        'string.pattern.base': `Password validation failed`,
        'string.empty': `Password cannot be empty`,
        'any.required': `Password is required`,
      }),
    role: Joi.string(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    email: Joi.string().email(),
    username: Joi.string(),
    about: Joi.string(),
    stack: Joi.string(),
    profile_image: Joi.string(),
    google_id: Joi.string(),
    linkedin_id: Joi.string(),
    github_id: Joi.string(),
    twitter_profile: Joi.string(),
    linkedin_profile: Joi.string(),
    github_profile: Joi.string(),
    user_location: Joi.string(),
    last_seen: Joi.string(),
  }),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
