
//Instancia de angular
var home = angular.module('mainModule');


//Se crea un controlador con su funcion callback
home.controller('moviesController', moviesController);




//Se definen todos aquellos elemtentos que seran utilizados por el nodo del DOM que
//tenga la instancia de este controlador
function moviesController($scope){



	$scope.home = {username: 'Name 1', password: 'Password 1'};


	$scope.hello = function(){
		console.log(JSON.stringify($scope.home)+" from moviesController 1");
	};



}


