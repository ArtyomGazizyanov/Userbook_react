"use strict";
exports.__esModule = true;
var cors = require("cors");
var crypto = require("crypto");
var constant_1 = require("./constant");
var express = require("express");
var multer = require("multer");
var path = require("path");
var sqlite = require("sqlite3");
var fs = require("fs");
var storage = multer.diskStorage({
    destination: 'upload/',
    filename: function (req, file, cb) {
        crypto.randomBytes(16, function (err, raw) {
            if (err) {
                return;
            }
            cb(null, raw.toString('hex') + path.extname(file.originalname));
        });
    }
});
var upload = multer({ storage: storage });
sqlite.verbose();
var app = express();
var db = new sqlite.Database(constant_1.constant.DB_NAME);
app.use(cors());
db.serialize(function () {
    var query = "CREATE TABLE IF NOT EXISTS UserBase"
        + "(`id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,"
        + "`lastName` TEXT,"
        + "`name` TEXT,"
        + "`middleName` TEXT,"
        + "`email` TEXT,"
        + "`birthDate` DATETIME,"
        + "`phone` TEXT,"
        + "`image` LONGBLOB"
        + ")";
    db.run(query);
});
app.post("/insert", upload.single("image"), function (req, res) {
    var query = "INSERT INTO UserBase "
        + "('lastName', 'name', 'middleName', 'birthDate', 'email', 'phone', 'image')"
        + ("VALUES ('" + req.body.lastName + "', '" + req.body.name + "', '" + req.body.middleName + "'")
        + (", '" + req.body.birthDate + "',")
        + ("'" + req.body.email + "', '" + req.body.phone + "', '" + req.file.filename + "')");
    db.run(query);
    res.send("New User posted");
});
app["delete"]("/delete/:id", function (req, res) {
    db.each("SELECT image FROM UserBase WHERE id = " + req.params.id, function (err, row) {
        fs.unlink(path.join(__dirname, "../" + row.photo));
    });
    var query = "DELETE FROM UserBase "
        + ("WHERE id = " + req.params.id);
    db.run(query);
    res.send("Deleted user ('" + req.params.id + "')");
});
app.put("/change/:id", upload.single("image"), function (req, res) {
    var query = "";
    if (req.file) {
        query = "UPDATE UserBase SET "
            + ("'lastName' = '" + req.body.lastName + "', 'name' = '" + req.body.name + "'")
            + (", 'middleName' = '" + req.body.middleName + "', 'birthDate' = '" + req.body.birthDate + "'")
            + (", 'email' = '" + req.body.email + "', 'phone' = '" + req.body.phone + "', 'image' = '" + req.file.filename + "'")
            + (" WHERE id = '" + req.params.id + "'"); //брать с params id
    }
    else {
        query = "UPDATE UserBase SET "
            + ("'lastName' = '" + req.body.lastName + "', 'name' = '" + req.body.name + "'")
            + (", 'middleName' = '" + req.body.middleName + "', 'birthDate' = '" + req.body.birthDate + "'")
            + (", 'email' = '" + req.body.email + "', 'phone' = '" + req.body.phone + "'")
            + (" WHERE id = '" + req.params.id + "'"); //брать с params id
    }
    db.run(query);
    res.send("Fuck yeah");
});
app.get("/users/:id", function (req, res) {
    var userList = [];
    db.each("SELECT * FROM UserBase WHERE id = " + req.params.id, function (err, row) {
        userList.push({
            id: row.id,
            lastName: row.lastName,
            name: row.name,
            middleName: row.middleName,
            birthDate: row.birthDate,
            email: row.email,
            phone: row.phone,
            image: row.image
        });
    }, function (err, count) {
        res.send(userList[0]);
    });
});
app.get("/users", function (req, res) {
    var userList = [];
    db.each("SELECT * FROM UserBase", function (err, row) {
        userList.push({
            id: row.id,
            lastName: row.lastName,
            name: row.name,
            middleName: row.middleName,
            birthDate: row.birthDate,
            email: row.email,
            phone: row.phone,
            image: row.image
        });
    }, function (err, count) {
        res.send(userList);
    });
});
app.get("/getPhoto/:photo", function (req, res) {
    var photo = req.params.photo;
    res.sendFile(path.join(__dirname, "upload/" + photo));
});
app.listen(constant_1.constant.SERVER_PORT, function () {
    console.log("User manager is working");
});
