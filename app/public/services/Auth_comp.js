angular.module('myFoodees')
  .factory('Auth_comp',['$http','$rootScope','$location','$window',function($http,$rootScope,$location,$window){
 
    var token = $window.localStorage.token;//Current company token from the browser localstorage
    
    if(token)
      {
        var payload = JSON.parse($window.atob(token.split('.')[1]));// this is a decoder available in the browser..and we are taking the second elemt from the element
        
        $rootScope.currentCompany=payload.company//getting the company from the payload in the model
      }
    
    return{
      
      signin: function(company){
        return $http.post('/company/signin',company)
        .success(function(data){
          $window.localStorage.token = data.token;
          var payload = JSON.parse($window.atob(data.token.split('.')[1]));
          $rootScope.currentCompany=payload.company;
          $location.path('/');
          
        })
        .error(function(){
          delete $window.localStorage.token;
        })
        
      },
      signup:function(company){
        return $http.post('/company/signup', company)
        .success(function(){
          $location.path('/');
           console.log("Success")
        })
        .error(function(response){
          console.log("failed")
        });
      }
    }
    
}]);