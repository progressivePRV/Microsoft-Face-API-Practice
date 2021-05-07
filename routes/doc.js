const router =  require('express').Router();

router.get('/',(req,res,next)=>{
    res.render('v1/index.html');
});

module.exports = router;