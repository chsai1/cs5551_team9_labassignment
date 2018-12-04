var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var path= require("path");
var express = require('express');
var cors = require('cors');
var app = express();
const Clarifai = require('clarifai');
var url = 'mongodb://nikki:nikki123@ds051990.mlab.com:51990/lab_assignment';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit:'50mb',extended: true }));
app.use(express.static(__dirname +'/'));
app.post('/register', function (req, res) {
    MongoClient.connect(url, function(err, client) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var db =client.db('lab_assignment');
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
});
var insertDocument = function(db, data, callback) {
    db.collection('Users').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the Users collection.");
        callback();

    });
};
app.post('/login', function (req, res) {
    MongoClient.connect(url, function(err, client) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var db =client.db('lab_assignment');
        dats=req.body;
            db.collection('Users').find(
                {user:dats.user,password:dats.password});
                res.write("Logged in Successfully");
            res.end();
        });
});
app.post('/predict', function (req,res) {
    const Clarifaiapp = new Clarifai.App({
        apiKey: 'f4e16904e9b3468cbf18e5101b634ef2'
    });
    Clarifaiapp.models.predict(Clarifai.GENERAL_MODEL,req.body.url).then(
        function (response) {
            console.log("endhi");
            MongoClient.connect(url, function(err, client) {
                if(err)
                {
                    res.write("Failed, Error while connecting to Database");
                    res.end();
                }
                var db =client.db('lab_assignment');
                for(var i=0;i<response['outputs'][0]['data']['concepts'].length;i++) {
                    console.log(response['outputs'][0]['data']['concepts'].length);
                    var imagedata = {
                        "id": req.body.url, "name": response['outputs'][0]['data']['concepts'][i].name,
                        "value": response['outputs'][0]['data']['concepts'][i].value
                    };
                    insertData(db, imagedata, function () {
                        res.sendStatus(200);
                        res.write("Successfully inserted Predicted Data");
                    });
                }

            });
           res.send(response['outputs'][0]['data']['concepts']);

        },
        function (err) {
            console.log(err);
        }
    );
});
var insertData = function(db, imgdata) {
    db.collection('PredictedData').insertOne(imgdata, function (err, result) {
        if (err) {
            res.write("Predicted data insertion Failed, Error While inserting");
        }
        console.log("Inserted a document into the PredictedData collection.");
    });
};
app.post('/get', function (req, res) {
    MongoClient.connect(url, function(err, client) {
        if (err) {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var db = client.db('lab_assignment');
        imgdata = req.body;
            var cursor = db.collection('PredictedData').find({id:req.body.url,name:req.body.search});
            cursor.each(function (err, doc) {
                assert.equal(err, null);
                if (doc != null) {
                    console.log(doc);
                    res.send(doc);


                } else {
                }
            });
    });
});
app.post('/del', function (req, res) {
    MongoClient.connect(url, function(err, client) {
        if (err) {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        console.log("delete function");
        var db = client.db('lab_assignment');
        imgdata = req.body;
        var cursor = db.collection('PredictedData').deleteOne({id: req.body.url, name: req.body.search}).then(
            function () {
                console.log("deleted successfully");
            }
        );
    });
});
app.post('/edit', function (req, res) {
    MongoClient.connect(url, function(err, client) {
        if (err) {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        console.log("Update function");
        var db = client.db('lab_assignment');
        imgdata = req.body;
        console.log(req.body);
         db.collection('PredictedData').updateOne({"name": req.body.search},{$set: {"name" : req.body.update}}).then(
            function () {
                console.log("Data Updated successfully");
            }
        );
    });
});
var server = app.listen(8080, 'localhost', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)

});