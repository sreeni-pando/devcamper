const logger = (req, res, next) =>{
    req.hello = "hello user";
    console.log('req middle', req.hello);
    next();
}
module.exports = logger;