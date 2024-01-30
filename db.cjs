const {MongoClient} = require('mongodb')

let db
function connectToDb(startServer) {
    MongoClient.connect('mongodb+srv://kavya:kavya@cluster0.qxks80m.mongodb.net/ExpenseTracker?retryWrites=true&w=majority').then(function(client) {
        db = client.db()
        return startServer()
    }).catch(function(error) {
        return startServer(error)
    })
}

function getDb() {
    return db
}

module.exports = {connectToDb, getDb}
