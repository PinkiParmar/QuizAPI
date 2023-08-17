const jwt= require('jsonwebtoken');
const dotenv = require("dotenv")
dotenv.config()

const secretKey = process.env.SECRET_KEY;

module.exports=reqFilter=(req,res,next) => {
    // console.log('tokkkkk', req.headers);
    const mainToken = req.headers["authorization"];
    if(mainToken) {
        let token = mainToken.split(' ');
        console.log('token', token[1])

        if (!token[1]) {
            return res.json({'code':403,'status':false,'message':'A Token is required'});
        } else {

            if ('tokenMatch condition will be here') {
                let verifyToken = jwt.verify(token[1], secretKey);
                console.log('reqFilter', verifyToken)
                next();

            } else {
                return res.json({'code':403,'status':false,'message':'Invalid Token.'});
            }
        }
    } else {
        return res.json({'code':403,'status':false,'message':'A Token is required'});
    }
}