module.exports = (req, res, next) => {
    console.log('Autentifikatsiya qilish!');
    const auth = true
    if (auth) {
        next()
    } else {
        res.send('Auth is failed. Login is not true')
    }
}