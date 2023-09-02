const {verify} = require('jsonwebtoken')

const Auth = (req, res, next) => {
    const {authorization} = req.headers

    if (!authorization) {
        res.status(404).json({message : "Authorization Required"})
    } else {
        try {
            const decode = verify(authorization, process.env.JWT_SECRET)
            // console.log(decode)
            next()
        } 
        
        catch (error) {
            res.status(500).json({message: "invalid token"})
        }
    }
}

module.exports = Auth