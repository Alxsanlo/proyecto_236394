const express = require('express');
const user = express.Router();
const jwt = require('jsonwebtoken');
//const pk = require('../pokedex.json').pokemon;
const db = require('../config/database');


user.post("/login", async (req, res, next) => { 
	const { user_mail, user_password } = req.body;
	const query = `SELECT * FROM usuarios WHERE correo = '${user_mail}' AND contrasena = '${user_password}'`;
	const rows = await db.query(query);
	
	if(user_mail && user_password){
		if(rows.length == 1){
			const token = jwt.sign({
				user_id: rows[0].user_id,
				user_mail: rows[0].user_mail
			}, "debugkey");
			return res.status(200).json({code: 200, message: token });
		}
		else{
			return res.status(200).json({code: 401, message:"Usuarios y/o constrasena incorrectos" });
		}
	}else{
		return res.status(500).json({code: 500, message:"Campos incompletos" });
	}
	

});

user.post("/", async (req, res, next) => {

	const { user_name, user_mail, user_password } = req.body;

	if(user_name && user_mail && user_password){
		let query = "INSERT INTO user ( user_name, user_mail, user_password)  ";
		query += `VALUES ('${user_name}', '${user_mail}', '${user_password}')`;

		const rows = await db.query(query);

		if(rows.affectedRows == 1){
			return res.status(201).json({code: 201, message:"Usuario regstrado correctamente" });
		}

		return res.status(201).json({code: 500, message:"Odurrio un error" });
	}
	return res.status(201).json({code: 500, message:"Campos incompletos" });
});


user.get('/', async (req, res, next) =>{
	const users = await db.query("SELECT * FROM usuarios");
	return res.status(200).json({code: 200, message: users});
});


user.delete("/:id([0-9]{1,3})", async (req, res, next) =>{
	const query = `DELETE FROM usuarios WHERE id=${req.params.id}`;
	const rows = await db.query(query);

	if(rows.affectedRows == 1){
		return res.status(200).json({code: 201, message: "Usuario borrado correctamente"});

	}
	return res.status(404).json({code: 404, message: "Usuario no encontrado"});
});


module.exports = user;