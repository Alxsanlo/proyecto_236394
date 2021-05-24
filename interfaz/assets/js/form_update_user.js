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
		document.querySelector('#btn_agregar').addEventListener('click', updateUser);
		document.querySelector('#btn_salir').addEventListener('click', function(){
			window.location.href = "index.html";
		});
		loadViewUpdateUser();
	}else{
		window.location.href = "login.html";
	}
}

function loadViewUpdateUser(){

	document.getElementById('input_nombre').value = localStorage.getItem("ls_nombre");
	document.getElementById('input_apellidos').value = localStorage.getItem("ls_apellidos");
	document.getElementById('input_telefono').value = localStorage.getItem("ls_telefono");
	document.getElementById('input_correo').value = localStorage.getItem("ls_correo");
	document.getElementById('input_direccion').value = localStorage.getItem("ls_direccion");
}

function updateUser(){

	var id = localStorage.getItem("ls_id");

	var nombre = document.getElementById('input_nombre').value;
	var apellidos = document.getElementById('input_apellidos').value;
	var telefono = document.getElementById('input_telefono').value;
	var correo = document.getElementById('input_correo').value;
	var direccion = document.getElementById('input_direccion').value;

	console.log(nombre, apellidos, telefono, correo,direccion);

	axios({
		method: 'put',
		url: 'http://localhost:3000/user/' + id,
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
		//window.location.href = "form_user.html";
	}).catch(function(err) {
		console.log(err);  
	})
	localStorage.removeItem("ls_id");
	localStorage.removeItem("ls_nombre");
	localStorage.removeItem("ls_apellidos");
	localStorage.removeItem("ls_telefono");
	localStorage.removeItem("ls_correo");
	localStorage.removeItem("ls_direccion");

	//window.location.href = 'index.html';
}

