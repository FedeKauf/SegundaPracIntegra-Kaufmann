import e, { Router } from "express";
import passport from 'passport';
export const router=Router()

router.get('/github', passport.authenticate('github',{}),(req,res)=>{})

router.get('/callbackGithub',passport.authenticate('github',{failureRedirect:'/api/sessions/errorGithub'}),(req,res)=>{
    
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        mensaje:'Login OK',
        usuario: req.user
    });
});

router.get('/errorGithub',(req,res)=>{
    
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        error:'Error en Github'
    });
});

router.post('/registro', passport.authenticate('registro',{failureRedirect:'/api/sessions/errorRegistro'}),async(req,res)=>{
    let {nombre, email, password}=req.body

    // if(!nombre || !email || !password){
    //     return res.status(400).send('faltan datos')
    // }

    // let existe=await modeloUsuarios.findOne({email})
    // if(existe){
    //     return res.status(400).send('Usuario ya está registrado')
    // }

    // password=crypto.createHmac('sha256', 'palabraSecreta').update(password).digest('base64')
    // await modeloUsuarios.create({
    //     nombre, email, password
    // })
    console.log(req.user)
    res.redirect(`/login?usuarioCreado=${email}`)
})
router.get('/errorLogin',(req,res)=>{
    
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        error:'Error Login'
    });
});
router.post('/registro', function(req, res, next) {
    passport.authenticate('registro', function(err, user, info, status) {
      if (err) { return next(err) }
      if (!user) { return res.redirect(`/registro?error=${info.message?info.message:info.toString()}`) }
    //   res.redirect('/account');
        req.user=user
        return next()
    })(req, res, next);
  } ,(req,res)=>{

    res.status(200).redirect(`/login?mensaje=Usuario ${req.user.nombre} registrado correctamente. Username: ${req.user.email}`)
})

router.post('/login', passport.authenticate('login',{failureRedirect:'/api/sessions/errorLogin'}),async(req,res)=>{
    // let {email, password}=req.body
    // if(!email || !password) {
    //     return res.send('faltan datos')
    // }

    // password=crypto.createHmac('sha256', 'palabraSecreta').update(password).digest('base64')

    // let usuario=await modeloUsuarios.findOne({email, password})
    // if(!usuario){
    //     return res.status(401).send ('credenciales incorrectas')
    // }
    console.log(req.user)
    // req.session.usuario={
    //     nombre: usuario.nombre,
    //     email: usuario.email
    // }
    req.session.usuario=req.user
    res.redirect('/perfil')
})

router.post('/login', function(req, res, next) {
    passport.authenticate('login', function(err, user, info, status) {
      if (err) { return next(err) }
      if (!user) { return res.redirect(`/login?error=${info.message?info.message:info.toString()}`) }
    //   res.redirect('/account');
        req.user=user
        return next()
    })(req, res, next);
  } ,(req,res)=>{

    res.status(200).redirect(`/perfil?mensaje=Usuario ${req.user.nombre} logueado correctamente. Rol: ${req.user.rol}`)
})

router.get('/logout',(req,res)=>{
    req.session.destroy(e=>console.log(e))
    res.redirect('/login?mensaje=logout correcto...!')
})

router.get('/current', (req,res)=> {
    res.redirect('./current')
  })