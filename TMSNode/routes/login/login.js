// routes/login/login.js
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../../model/demo/user')

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'youraccesstokensecret'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'yourrefreshtokensecret'

function getaccessTokens(user) {
  return jwt.sign(user,ACCESS_TOKEN_SECRET,{expiresIn: '2h'})
}
function getrefreshTokens(user){
  return jwt.sign(user,REFRESH_TOKEN_SECRET,{expiresIn: '7d'})
}
function getJwtToken(info){
  const accesstoken=getaccessTokens(info)
  const refreshtoken=getrefreshTokens(info)
  return {
    accesstoken,
    refreshtoken
  }
}
router.post('/', async (req, res) => {
  try{
    const {username,password}=req.body
    if(!username || !password){
      return res.status(400).json({
            code:400,
            message:"用户名或者密码不能为空"
      })
    }
    const {rows} =await User.findAndCountAll({
      where:{
        username,
        password
      }
     
    })
     
     if(rows.length>0){
      const user=rows[0]
      const jwtToken=getJwtToken(user.toJSON())
      console.log('1111',jwtToken);
      
     res.send({
  code: 200,
  message: "成功获取数据",
  data: {
    user: user.toJSON(),
    accessToken: jwtToken.accesstoken,
    refreshToken: jwtToken.refreshtoken
  }
})
     }
     console.log('hhhhhhhhhhhhhhhhhh');
     
  }
  
  
  catch(error){
    console.log('获取数据失败',error);
    res.send(
      {
        code:500,
        message:"失败",
        error:error.message
      }
    )
    

  }
 
})

module.exports = router