require('dotenv').config()

require('./config/database')

const app = require('./app-server')

const PORT = process.env.PORT || 5022

app.listen(PORT, () => {
	console.log(`I am listening on ${PORT}. We in the Building`)
})

