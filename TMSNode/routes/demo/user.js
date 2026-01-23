const express = require('express');
const router = express.Router();

const user = require('../../model/demo/user')

router.post('/list', async (req, res, next) => {
  const data = await user.findAll()
  res.json({
    code: 200,
    msg: '查询成功',
    data
  })
})

module.exports = router