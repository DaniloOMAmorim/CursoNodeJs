export default {
  mongoUrl: process.env.MONGO_URL,
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'errVar',
  saltBcrypt: parseInt(process.env.BCRYPT_SALT) || 12
}
