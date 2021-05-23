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
		loadUsers();
	}else{
		window.location.href = "login.html";
	}
}

function loadUsers(){
	axios.get(url + "/user", headers)
	.then(function(res){
		console.log(res);
		displayUsers(res.data.message);
	}).catch(function(err){
		console.log(err);
	})
}

function deleteUser(id){
	axios.delete(url + "/user/"+id)
	.then(function(res){
		window.location.href = "login.html";
		if (res.data.code = 201) {
			alert("Usuario borrado corréctamente");
		}
	}).catch(function(err){
		console.log(err);
	})
}

function displayUsers(users){
	var body = document.querySelector("tbody");
	for (var i = 0; i < users.length; i++) {
		body.innerHTML += `<tr>
					        <th>${users[i].nombre}</th>
					        <td>${users[i].apellidos}</td>
					        <td>${users[i].telefono}</td>
					        <td>${users[i].correo}</td>
					        <td>${users[i].direccion}</td>
					        <td>
					        	<button onclick="deleteUser(${users[i].id})" class="btn btn-danger btn-sm"><i class="bi bi-trash"></i></button>
					        	<a class="ml-1 btn btn-warning btn-sm" href="#"><i class="bi bi-pencil"></i></a>
					        </td>
					      </tr>`;
	}
}