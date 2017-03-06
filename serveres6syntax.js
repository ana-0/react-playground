require("babel-register");
import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import swig from 'swig'
import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'router'
import routes from './app/routes'

let app = express()

app.set('port', process.env.PORT || 3000)
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res) => {
    Router.match({ routes: routes.default, location: req.url  },
        (err, redirectLocation, renderProps) => {
            if (err) {
                res.status(500).send(err.message)
            } else if (redirectLocation) {
                res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
            } else if (renderProps) {
                let html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps))
                let page = swig.renderFile('views/index.html', { html: html  })
                res.status(200).send(page)
            } else {
                res.status(404).send('Page Not Found')
            }
        })
})

app.listen(app.get('port'), () => {
  console.log('Express server listening on port '+ app.get('port'))
})

