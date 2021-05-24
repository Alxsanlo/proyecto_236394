window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init(){
	if (localStorage.getItem("token")) {
		headers = {
			headers: {
				'Authorization': "bearer " + localStorage.getItem("token")
			}
		}
		document.querySelector('#btn_agregar').addEventListener('click', addUser);
		document.querySelector('#btn_salir').addEventListener('click', function(){
			window.location.href = "index.html";
		});
	}else{
		window.location.href = "login.html";
	}
}



function addUser(){
	var nombre = document.getElementById('input_nombre').value;
	var apellidos = document.getElementById('input_apellidos').value;
	var telefono = document.getElementById('input_telefono').value;
	var correo = document.getElementById('input_correo').value;
	var direccion = document.getElementById('input_direccion').value;

	console.log(nombre, apellidos, telefono, correo,direccion);

	axios({
		method: 'post',
		url: 'http://localhost:3000/user/add',
		data: {
			user_nombre: nombre,
			user_apellidos: apellidos,
			user_telefono: telefono,
			user_correo: correo,
			user_direccion: direccion
		}
	}).then(function(res) {
		console.log(res);
		alert('Registro exitoso');
		window.location.href = "form_user.html";
	}).catch(function(err) {
		console.log(err);  
	})
}

