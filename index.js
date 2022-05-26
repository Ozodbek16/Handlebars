const express = require('express')
const app = express() // object // {}
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const { create } = require('express-handlebars')

const homeRouter = require('./routes/home')
const aboutRouter = require('./routes/about')
const booksRouter = require('./routes/books')

require('dotenv').config()

const exhbs = create({
    extname: 'hbs',
    defaultLayout: 'layout'
})

app.engine('hbs', exhbs.engine)
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')))

const loggerMiddleware = require('./middleware/logger')

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(helmet())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'))
}

app.use(loggerMiddleware)

app.use('/', homeRouter)
app.use('/about', aboutRouter)
app.use('/api/books', booksRouter)

try {
    const port = process.env.PORT || 5000
    app.listen(port, () => {
        console.log('Server working on port', port);
    })
} catch (error) {
    console.error(error);
}