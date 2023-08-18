const jwt= require('jsonwebtoken');
const dotenv = require("dotenv")
dotenv.config()

const secretKey = process.env.SECRET_KEY;

module.exports=reqFilter=(req,res,next) => {
    // console.log('tokkkkk', req.headers);
    const mainToken = req.headers["authorization"];
    console.log(mainToken)
    if(mainToken) {
        let token = mainToken.toString().split(' ');
        console.log('token', token[1])

        if (!token[1]) {
            return res.json({'code':403,'status':false,'message':'A Token is required'});
        } else {
            // const decoded = JSON.parse(
            //     Buffer.from(token.split(".")[1], "base64").toString()
            //   );
            //   console.log('decoded token', decoded);
            let verifyToken = jwt.verify(token[1], secretKey);
            console.log('reqFilter', verifyToken)
            if (verifyToken === null || verifyToken === undefined){
                return res.json({'code':403,'status':false,'message':'Invalid Token.'});
            } else if (verifyToken?.payload?.user_id!==null && verifyToken?.payload?.user_id!==undefined) {
                next();
            } else {
                return res.json({'code':403,'status':false,'message':'Invalid Token.'});
            }
        }
    } else {
        return res.json({'code':403,'status':false,'message':'A Token is required'});
    }
}