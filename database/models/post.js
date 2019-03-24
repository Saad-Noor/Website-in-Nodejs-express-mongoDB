const moongoose = require ('mongoose')

const PostSchema = new moongoose.Schema({

title: String,

subtitle: String,

image: String,

content: String,

author:{

type: moongoose.Schema.Types.ObjectId,
ref: 'User',
required:true,
},

createdAt:{

    type: Date,
    default: new Date()
}

})


const Post = moongoose.model('Post',PostSchema)

module.exports= Post