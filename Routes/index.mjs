import express from "express";


const router = express.Router();

router.use(express.static("public"));
router.use(express.urlencoded({extended: false}))


router.get("/" , (req , res) =>{
    res.render("welcome")
})

router.get("/login" , (req ,res)=>{
    res.render("login");
});

router.get("/register" , (req ,res)=>{
    res.render("register");
});

export default router;
