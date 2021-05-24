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

user.get('/:name([A-Za-z]+)', async (req, res, next) =>{
	var name = req.params.name + " ";
	const users = await db.query("SELECT * FROM usuarios WHERE nombre = '"+ name +"';");

	(users.length > 0) ? 
		res.status(200).json({code: 200, message: users}) : 
		res.status(404).json({code: 404, message: "Usuario no encontrado"});
});

user.get('/:id([0-9]{1,3})', async (req, res, next) =>{
	const id = req.params.id;
	if(id >= 0 && id <= 722){
		const usuarios = await db.query("SELECT * FROM usuarios WHERE id = " + id + ";");
		return res.status(200).json({code: 1, message: usuarios});
	}
	
	return res.status(404).send({code: 404, message: "Usuario no encontrado"});
	
});

user.post("/add", async (req, res, next) => {

	const { user_nombre, user_apellidos, user_telefono, user_correo, user_direccion} = req.body;

	if(user_nombre && user_apellidos && user_telefono && user_correo && user_direccion){
		let query = "INSERT INTO usuarios ( nombre, apellidos, telefono, correo, direccion)  ";
		query += `VALUES ('${user_nombre}', '${user_apellidos}', '${user_telefono}', '${user_correo}', '${user_direccion}')`;

		const rows = await db.query(query);

		if(rows.affectedRows == 1){
			return res.status(201).json({code: 201, message:"Usuario regstrado correctamente" });
		}

		return res.status(201).json({code: 500, message:"Odurrio un error" });
	}
	return res.status(201).json({code: 500, message:"Campos incompletos" });
});


user.put("/:id([0-9]{1,3})", async (req, res, next) =>{

	const { user_nombre, user_apellidos, user_telefono, user_correo, user_direccion} = req.body;

	if( user_nombre && user_apellidos && user_telefono && user_correo && user_direccion){
		let query = `UPDATE usuarios SET nombre='${user_nombre}', apellidos='${user_apellidos}',`;
		query += `telefono=${user_telefono}, correo='${user_correo}', direccion='${user_direccion}' WHERE id=${req.params.id}`;



		const rows = await db.query(query);
		console.log(rows);

		if(rows.affectedRows == 1){
			return res.status(200).json({code: 200, message: "Pokemon actualizado correctamente"});
		}
		return res.status(500).json({code: 500, message: "Ocurrió un error"});
	}
	
	return res.status(500).json({code: 500, message: "Campos incompletos"});

});


module.exports = user;