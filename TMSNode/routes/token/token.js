// routes/refresh/refresh-token.js
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../../model/demo/user')

const app = express();

app.use(express.json());                       // 处理 application/json 格式请求体
app.use(express.urlencoded({ extended: true })); // 处理 x-www-form-urlencoded 格式请求体
app.use(express.json());  
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET 
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET 
function getaccessTokens(user) {
  return jwt.sign(user,ACCESS_TOKEN_SECRET,{expiresIn: '2h'})
}
router.post('/', async (req, res) => {
    const {refreshToken} =req.body
    
    if(!refreshToken){
      return res.status(403).json({
        code:403,
        message:"没有找到刷新token",
        error: 'Refresh token is notfind'
      })
    }
    let tokenToVerify=refreshToken
    if(typeof refreshToken==="string"){
      try{
        tokenToVerify=JSON.parse(refreshToken)
      }catch(e){
        tokenToVerify=refreshToken
      }
    }
    jwt.verify(tokenToVerify,REFRESH_TOKEN_SECRET,(err,user)=>{
      if(err){
        return res.status(403).json({
          code:403,
          message:"刷新token无效",
          error:'Invalid refresh token'
        })
      }
      const newAccessToken=getaccessTokens({username:user.username})
      res.json({accessToken:newAccessToken})
    })
   
})

module.exports = router