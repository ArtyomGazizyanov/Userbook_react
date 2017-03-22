import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as crypto from "crypto";
import {constant} from "./constant";
import * as express from "express";
import * as multer from "multer";
import * as path from "path";
import * as sqlite from "sqlite3";
import * as fs from "fs";

var storage = multer.diskStorage({
  destination: 'upload/',
  filename: function (req, file, cb) {
    crypto.randomBytes(16, function (err, raw) {
      if (err) 
	  {
		  return 
	  }
      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})
var upload = multer({ storage: storage }) 

sqlite.verbose();

const app: express.Express = express();
const db: sqlite.Database = new sqlite.Database(constant.DB_NAME);

app.use(cors());

db.serialize(() => {
	const query: string = "CREATE TABLE IF NOT EXISTS UserBase"
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

 app.post("/insert", upload.single("image"), (req: express.Request, res: express.Response) => {
    
 	const query: string = `INSERT INTO UserBase `
 		+ `('lastName', 'name', 'middleName', 'birthDate', 'email', 'phone', 'image')`
 		+ `VALUES ('${req.body.lastName}', '${req.body.name}', '${req.body.middleName}'`
 	 	+ `, '${req.body.birthDate}',`
 	 	+ `'${req.body.email}', '${req.body.phone}', '${req.file.filename}')`;
  	db.run(query);
  	res.send(`New User posted`);
 });

app.delete("/delete/:id", (req: express.Request, res: express.Response) => {
	db.each(`SELECT image FROM UserBase WHERE id = ${req.params.id}`, (err, row) => {
		fs.unlink(path.join(__dirname, "../" + row.photo));
	});

	const query: string = `DELETE FROM UserBase `
	+ `WHERE id = ${req.params.id}`;

	db.run(query);
	res.send(`Deleted user ('${req.params.id}')`);
});

app.put("/change/:id", upload.single("image"), (req: express.Request, res: express.Response) => {
	let query: string = "";
	if(req.file)
	{
		query = `UPDATE UserBase SET `
		+ `'lastName' = '${req.body.lastName}', 'name' = '${req.body.name}'`
		+ `, 'middleName' = '${req.body.middleName}', 'birthDate' = '${req.body.birthDate}'`
		+ `, 'email' = '${req.body.email}', 'phone' = '${req.body.phone}', 'image' = '${req.file.filename}'`
		+ ` WHERE id = '${req.params.id}'`; //брать с params id
	}
	else
	{
		query = `UPDATE UserBase SET `
		+ `'lastName' = '${req.body.lastName}', 'name' = '${req.body.name}'`
		+ `, 'middleName' = '${req.body.middleName}', 'birthDate' = '${req.body.birthDate}'`
		+ `, 'email' = '${req.body.email}', 'phone' = '${req.body.phone}'`
		+ ` WHERE id = '${req.params.id}'`; //брать с params id
	}
	db.run(query);
	res.send("Fuck yeah");
});

app.get("/users/:id", (req, res) => {
	let userList: any = [];
	db.each(`SELECT * FROM UserBase WHERE id = ${req.params.id}`, (err, row) => {
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
		}, (err: Error, count: number) => {
			res.send(userList[0]);	
		});
});


app.get("/users", (req, res) => {
	let userList: any = [];
	db.each("SELECT * FROM UserBase", (err, row) => {
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
		}, (err: Error, count: number) => {
			res.send(userList);	
		});
}); 

app.get("/getPhoto/:photo",(req: express.Request, res: express.Response) => {
	const photo: string  = req.params.photo;
	res.sendFile(path.join(__dirname, "upload/" + photo));
});

app.listen(constant.SERVER_PORT, () => {
	console.log("Userbook.server is working");
});
