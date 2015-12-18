angular.module("myFoodees")
.factory('User',['$resource',function(resource){
    return resource('/api/users/:_id')
}]);