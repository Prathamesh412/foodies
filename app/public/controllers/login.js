angular.module('myFoodees')
.controller("LoginCtrl",["$scope",'Auth',function($scope,Auth){
  
  console.log("heyy")
  
  $scope.login = function(){
    
     Auth.signin({
      email:$scope.email,
      password:$scope.password  
    })
  };
  
   $scope.register = function(){
    
    Auth.signup({
      email:$scope.email,
      password:$scope.password  
    })
     
  };
  
}]);