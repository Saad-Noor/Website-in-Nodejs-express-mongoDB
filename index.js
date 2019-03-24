
const Post = require('./database/models/post')

const expressEdge = require('express-edge')

const express = require('express')

const edge = require('edge.js')

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const fileUpload = require('express-fileupload')

const expressSession = require('express-session')

const connectMongo = require('connect-mongo')

const connectFlash =require('connect-flash')


const createPostController = require('./controllers/createPost')

const homePageController = require('./controllers/homePage')

const storePostController = require('./controllers/storePost')

const getPostController = require('./controllers/getPost')

const createUserController = require('./controllers/createUser')

const storeUserController = require('./controllers/storeUser')

const loginControlller = require('./controllers/login')

const loginUserController = require('./controllers/loginUser')

const logoutController = require('./controllers/logout')

const app = new express()

mongoose.connect('mongodb://localhost/blogdb', { useNewUrlParser: true })

app.use(connectFlash())
const mongoStore = connectMongo(expressSession)

app.use(expressSession({

secret: 'secret',
store: new mongoStore({

    mongooseConnection: mongoose.connection
})
}))




app.use(fileUpload())

app.use(express.static('Public'))

app.use(expressEdge)


app.set('views',`${__dirname}/views`)

app.use('*',(req,res,next)=>{

    edge.global('auth',req.session.userId)
    next()
})

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))


const auth = require('./Middleware/auth')

const validateCreatePostMiddleware = require('./Middleware/storePost')

const redirectIfAuthenticatedMiddleware = require('./Middleware/redirectIfAuthenticatedMiddleware')


    
app.use('/posts/store',validateCreatePostMiddleware)


app.get('/', homePageController)

app.get('/post/new',auth, createPostController)

app.get('/post/:id', getPostController)
app.get('/auth/logout',auth, logoutController)

app.post('/posts/store',auth, validateCreatePostMiddleware, storePostController)
app.get('/auth/login',redirectIfAuthenticatedMiddleware,loginControlller)

app.get('/auth/register',redirectIfAuthenticatedMiddleware,createUserController)
app.post('/Users/register',redirectIfAuthenticatedMiddleware, storeUserController)

app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController)

app.use((req,res)=>{

res.render('notfound')
})


 

app.listen(4000,()=>{

    console.log('Port is listening')
})