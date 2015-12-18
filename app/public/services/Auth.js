angular.module('myFoodees')
  .factory('Auth',['$http','$rootScope','$location','$window',function($http,$rootScope,$location,$window){
 
    var token = $window.localStorage.token;//Current user token from the browser localstorage
    
    if(token)
      {
        var payload = JSON.parse($window.atob(token.split('.')[1]));// this is a decoder available in the browser..and we are taking the second elemt from the element
        
        $rootScope.currentUser=payload.user//getting the user from the payload in the model
      }
    
    return{
      
      signin: function(user){
        return $http.post('/auth/signin',user)
        .success(function(data){
          $window.localStorage.token = data.token;
          var payload = JSON.parse($window.atob(data.token.split('.')[1]));
          $rootScope.currentUser=payload.user;
          $location.path('/');
          
        })
        .error(function(){
          delete $window.localStorage.token;
        })
        
      },
      signup:function(user){
        return $http.post('/auth/signup', user)
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