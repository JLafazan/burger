//import mysql connection
var connection = require("../config/connection.js");

//helper function for mySQL syntax
function printQuestionMarks(num) {
    var arr = [];
   for (var i=0; i<num; i++) {
       arr.push("?");
    }
    return arr.toString();
}

//helper function for mySQL syntax
function objToSql(ob) {
    var arr=[];
    for (var key in ob) {
        if (Object.hasOwnProperty.call(ob, key)) {
            arr.push(key + "=" + ob[key]);
        }
    }
    return arr.toString();
}

//orm object
var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        console.log("queryString: " + queryString);
        connection.query(queryString, function(err, res) {
            if (err) throw err
            cb(res);
        });
    },
    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
        queryString += " (" + cols.toString() + ") VALUES (";
        queryString += printQuestionMarks(vals.length) + ") ";      
        console.log("queryString: " + queryString);

        connection.query(queryString, vals, function(err, res) {
            if (err) throw err
            cb(res);
        });
    },
    updateOne: function(table, obColVals, condition, cb) {
        var queryString = "UPDATE " + table + " SET ";
        queryString += objToSql(obColVals) + " WHERE " + condition;
        console.log("queryString: " + queryString);

        connection.query(queryString, function(err, res) {
            if (err) throw err
            cb(res);
        });
    }
  }

  module.exports = orm;