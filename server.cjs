const express = require('express')
const bodyParser = require('body-parser')
const {ObjectId} = require('mongodb')
// importing required functions
const {connectToDb, getDb} = require('./db.cjs')

const app = express()
app.use(bodyParser.json())
app.use(express.static(__dirname))

let db
// Connecting to the DB
connectToDb(function(error) {
    if(!error) {
        // Starting the server
        const port = process.env.PORT || 2024
        app.listen(2024)
        console.log('Listening on port 2024...')
        db = getDb()
        console.log(db)
    } else {
        // Server would not start
        console.log(error)
    }
})

/** end points
 * get-entries : fetching all the entry data
 * add-entry
 * delete-entry
 * edit-entry
 */

// Adding a new entry
// app.post('/add-entry', function(request, response) {
//     db.collection('ExpenseData')
//     .insertOne(request.body).then(function() {
//         response.status(201).json({
//             'status' : 'data successfully entered'
//         })
//     }).catch(function(error) {
//         response.status(500).json({
//             'error' : error
//         })
//     })
// })

// Getting all the entries in the DB
app.get('/get-data', function(request, response) {
    const entries = []
    db.collection('shopping')
    .find()
    .forEach(entry => entries.push(entry))
    .then(function() {
        response.status(200).json(entries)
    }).catch(function(error) {
        response.status(404).json({
            'error' : error
        })
    })
})

// app.delete('/delete-entry', function(request, response) {
//     // db.collection('').deleteOne({_id: new ObjectId()})
//     if(ObjectId.isValid(request.body.id)){
//         db.collection('shopping').deleteOne({
//             _id : new ObjectId(request.body.id)
//         }).then(function() {
//             response.status(201).json({
//                 'status' : 'data successfully deleted'
//             })
//         }).catch(function(error) {
//             response.status(500).json({
//                 'error' : error
//             })
//         })
//     } else {
//         response.status(500).json({
//             'status' : 'ObjectId not valid'
//         })
//     }
// })

// app.patch('/update-entry', function(request, response) {
//     if(ObjectId.isValid(request.body.id)) {
//         db.collection('ExpenseData').updateOne(
//             {_id: new ObjectId(request.body.id)},
//             {$set : request.body.data}
//         ).then(function() {
//             response.status(201).json({
//                 'status' : 'data successfully updated'
//             })
//         }).catch(function(error) {
//             response.status(500).json({
//                 'error' : error
//             })
//         })
//     } else {
//         response.status(500).json({
//             'status' : 'ObjectId not valid'
//         })
//     }
// })
