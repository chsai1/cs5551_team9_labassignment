
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://nikitha:nikki123@ds135993.mlab.com:35993/icp_9';

console.log(process.env.MONGO_ATLAS_PW);
MongoClient.connect(url, function(err, db) {

    if (err) throw err;
    var dbo = db.db("icp_9");
    var myobj = {
        classid: "1",
        Sname:"Nikki",
        course:"MS",
        major:"cs",
        minor:"ece"

    };
    dbo.collection("Users").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});
