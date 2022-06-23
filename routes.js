module.exports = function (app, myDataBase) {

  // Be sure to change the title
  app.route('/').get((req, res) => {
    // Change the response to render the Pug template
    res.render('pug', {
      title: 'Connected to Database',
      message: 'Please login',
      showLogin: true,
        showRegistration:true
    });
  });

  app.route('/login').post(passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/profile');
  });

  app.route('/profile').get(ensureAuthenticated, (req, res) => {
    res.render(process.cwd() + '/views/pug/profile', { username: req.user.username });
  });

  app.route('/logout').get((req, res) => {
    req.logout(err=>{
      if(err) console.log(err);
      res.redirect('/')
    });
    
  });

app.route('/register').post((req,res,next)=>{
  const hash = bcrypt.hashSync(req.body.password, 12);
  
  
  myDataBase.findOne({username:req.body.username},(err,user)=>{
    if(err) res.redirect('/');
    if(user)res.redirect('/');
    myDataBase.insertOne({username:req.body.username,password:hash},(err,doc)=>{
      if(err)res.redirect('/profile');

      next(null,doc.ops[0])
    })
  })
},passport.authenticate('local',{failureRedirect:'/'}),
(req,res,next)=>{
  res.redirect('/profile')
})



  app.use((req, res, next) => {
    res.status(404).type('text').send('Not Found');
  });
}