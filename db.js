const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost", { useUnifiedTopology: true })
            .then(conn => global.conn = conn.db("workshoptdc"))
            .catch(err => console.log(err))


const TAMANHO_PAGINA = 5; 

module.exports = { findAll, insertOne, findOne, update, deleteOne, countAll, TAMANHO_PAGINA}


function findAll(pagina){ 
    const tamanhoSkip = TAMANHO_PAGINA * (pagina - 1); 
    return global.conn.collection("customers")
                        .find({}).
                        skip(tamanhoSkip)
                        .limit(TAMANHO_PAGINA)
                        .toArray(); 
}

function insertOne(customer, callback){
    global.conn.collection("customers").insert(customer, callback);
}

var ObjectId = require("mongodb").ObjectId;
function findOne(id, callback){  
    global.conn.collection("customers").find(new ObjectId(id)).toArray(callback);
}
	
function update(id, customer, callback){
    global.conn.collection("customers").updateOne({_id: new ObjectId(id)}, {$set: customer}, callback);
}

function deleteOne(id, callback){
    global.conn.collection("customers").deleteOne({_id: new ObjectId(id)}, callback);
}

//callback deve considerar error e count
function countAll(){  
    return global.conn.collection("customers").countDocuments();
}
