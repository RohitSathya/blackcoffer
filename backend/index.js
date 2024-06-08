const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express()
app.use(express.json())
app.use(cors())
const {data} =require('./data')
const datamodel=require('./models/data')

mongoose.connect('mongodb+srv://admin:sunsetwest1234RRR@royoapi.3qmdrjq.mongodb.net/blackcoffer?retryWrites=true&w=majority&appName=RoyoApi').then(()=>{
    datamodel.insertMany(data).then(()=>{
        console.log('success')
    })
    console.log('dbcoonected')
    app.listen(8080,()=>console.log('server started'))
})

app.get('/fetchdata',async(req,res)=>{

    const data=await datamodel.find()
    res.json(data)
})
