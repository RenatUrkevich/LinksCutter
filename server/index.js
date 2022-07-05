const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const router = require('./routes/index');
const RedirectRouter = require('./routes/redirectRouter');
const app = express()
const cors = require('cors')

app.use(express.json({extended: true}))
app.use('/api', router)
app.use('/t', RedirectRouter)
const PORT = config.get('port')  || 8080
app.use(cors())

async function start(){
    try{
        await mongoose.connect(config.get('mongoURI'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    }catch(e){
        console.log('Server Error',e.message)
        process.exit(1)
    }
}

start()