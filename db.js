const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost", { useUnifiedTopology: true })
            .then(conn => global.conn = conn.db("workshoptdc"))
            .catch(err => console.log(err))
 
module.exports = { }