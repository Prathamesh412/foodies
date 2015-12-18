angular.module("myFoodees",['ngResource','ngRoute'])
.config(function($routeProvider){
  $routeProvider
  .when('/',{
    templateUrl:'views/foodees.html',
    controller:'FoodController'
   })

  .when('/login',{
  templateUrl:'/views/login.html',
  controller:'LoginCtrl'
})
  .when('/login/company',{
  templateUrl:'/views/login_comp.html',
  controller:'LoginCompanyCtrl'
})
//.when('/students/:id',{
//  templateUrl:'views/detail.html',
//  controller:'DetailController'
//  })
  
});