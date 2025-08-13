const authWare = async (req,res,next) => {
    const token = await req.cookies.gh_token;
    if(!token){
        res.status(404).send({
            success: false,
            message: 'token not found'
        })
    }
    next()
}

module.exports = authWare;