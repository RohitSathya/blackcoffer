const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express()
app.use(express.json())
app.use(cors())
const {data} =require('./data')
const datamodel=require('./models/data')

mongoose.connect('mongodb://localhost:27017/testdb').then(()=>{
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