import Joi from 'joi';

export const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  status: Joi.string().valid('To Do', 'In Progress', 'Completed'),
  group_id: Joi.number().optional(),
});

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const adminTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  status: Joi.string().valid('To Do', 'In Progress', 'Completed'),
  userId: Joi.number().required(),
});

export const groupSchema = Joi.object({
  name: Joi.string().required().max(255),
  description: Joi.string().allow('').max(1000),
});

export const groupMemberSchema = Joi.object({
  userId: Joi.number().required(),
  role: Joi.string().valid('owner', 'member').default('member'),
});
