const mongoose = require('mongoose')

const Post = require('./database/models/post')


mongoose.connect('mongodb://localhost/blog_test')


Post.find({},(error,posts)=>{

    console.log(error,posts)
})



Post.create({

title: 'my 12st blog',

description: 'chal jayien please',

content:' chal gyato kam harab', 




}, (error, post)=>{


    console.log(error,post)
})

/*Post.findByIdAndUpdate("5c951233849d48745ff5ec67",{

    title: 'my 2nd blog'
},(error,post)=>{

    console.log(error,post)
})*/