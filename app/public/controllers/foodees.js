angular.module("myFoodees")
.controller('FoodController',['$scope','User',function($scope,User){
  
  $scope.user=User.query();
  User.get({_id:"567409dd3a47a32c0ca31c23"},function(user){
                      $scope.user=user;                                                 
    })
}]);
