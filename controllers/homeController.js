const getHome = async (req, res) => {
  res.render('login.ejs')
}

module.exports = {
  getHome
}