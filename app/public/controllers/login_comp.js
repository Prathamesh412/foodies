angular.module('myFoodees')
.controller("LoginCompanyCtrl",["$scope",'Auth_comp',function($scope,Auth){
  
  console.log("inside the company controller")
  
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