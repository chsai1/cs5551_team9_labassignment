var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://nikitha:nikki123@ds135993.mlab.com:35993/icp_9';
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    db.close();
});
