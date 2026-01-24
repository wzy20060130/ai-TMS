// routes/refresh/refresh-token.js
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../../model/demo/user')

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'youraccesstokensecret'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'yourrefreshtokensecret'
function getaccessTokens(user) {
  return jwt.sign(user,ACCESS_TOKEN_SECRET,{expiresIn: '2h'})
}
router.post('/', async (req, res) => {
  try {
    const refreshToken =req.body
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
  } catch (err) {
    console.error('refresh-token error:', err)
    return res.status(500).json({ message: '服务器错误' })
  }
})

module.exports = router