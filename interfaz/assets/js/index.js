window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init(){
	if (localStorage.getItem("token")) {
		document.querySelector('#search_button').addEventListener('click', loadUsers);
		document.querySelector('#back_button').addEventListener('click', function(){
			window.location.href = "index.html";
		});
		document.querySelector('#new_button').addEventListener('click', function(){
			window.location.href = "form_user.html";
		});
		document.querySelector('#btn_cerrar_sesion').addEventListener('click', function(){
			localStorage.removeItem("token");
			window.location.href = "login.html"
		});
		headers = {
			headers: {
				'Authorization': "bearer " + localStorage.getItem("token")
			}
		}
		loadUsers();
	}else{
		window.location.href = "login.html";
	}
}

function loadUsers(){
	var name = "" + document.getElementById('input-name').value;
	var btn = document.getElementById("back_button");
	if (name == "") {
		axios.get(url + "/user", headers)
		.then(function(res){
			console.log(res);
			displayUsers(res.data.message);
			btn.style.display = "none";
		}).catch(function(err){
			console.log(err);
		})
	}else{
		document.getElementById('user_table').innerHTML = "";
		axios.get(url + "/user/" + name, headers)
		.then(function(res){
			console.log(res);
			displayUsers(res.data.message);
			btn.style.display = "inline-block";
		}).catch(function(err){
			console.log(err);
		})
	}
}

function deleteUser(id){
	axios.delete(url + "/user/"+id)
	.then(function(res){
	alert("usuario borrado corréctamente");
	window.location.href = index.html;
	}).catch(function(err){
		console.log(err);
	})
}

function loadViewUpdateUser(id){
	axios.get(url + "/user/"+id)
	.then(function(res){
		if (res.data.code = 200) {
			//window.location.href = "form_user.html";
			var user = res.data.message;
			console.log("nombre: " + user[0].nombre);
			localStorage.setItem("ls_id", user[0].id);
			localStorage.setItem("ls_nombre", user[0].nombre);
			localStorage.setItem("ls_apellidos", user[0].apellidos);
			localStorage.setItem("ls_telefono", user[0].telefono);
			localStorage.setItem("ls_correo", user[0].correo);
			localStorage.setItem("ls_direccion", user[0].direccion);
			window.location.href = "form_update_user.html";
		}
	}).catch(function(err){
		console.log(err);
	})
}

function updateUser(id){
	axios.put(url + "/user/"+id)
	.then(function(res){
		if (res.data.code = 201) {
			alert(res.data.message);
			window.location.href = "index .html";
		}
	}).catch(function(err){
		console.log(err);
	})
}

function displayUsers(users){
	var tbody = document.querySelector("tbody");
	for (var i = 0; i < users.length; i++) {
		tbody.innerHTML += `<tr>
					        <th>${users[i].nombre}</th>
					        <td>${users[i].apellidos}</td>
					        <td>${users[i].telefono}</td>
					        <td>${users[i].correo}</td>
					        <td>${users[i].direccion}</td>
					        <td>
					        	<button onclick="deleteUser(${users[i].id})" class="btn btn-danger btn-sm"><i class="bi bi-trash"></i></button>
					        	<button onclick="loadViewUpdateUser(${users[i].id})" class="ml-1 btn btn-warning btn-sm" ><i class="bi bi-pencil"></i></button>
					        </td>
					      </tr>`;
	}
}


