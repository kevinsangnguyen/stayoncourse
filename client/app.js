var myApp = angular.module('myApp', ['ui.bootstrap', 'ui.router', 'ui.navbar', 'jcs-autoValidate', 'ngAnimate', 'ngToast', 'ngSanitize', 'dndLists', 'duScroll'])
.value('duScrollDuration', 1000)
 .value('duScrollOffset', 30);


myApp.run(function(defaultErrorMessageResolver){
  defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages){
    errorMessages['badName'] = 'Name must only contain Alpha characters.';
    });
  }
);

myApp.config(['ngToastProvider', function(ngToast) {
    ngToast.configure({
      verticalPosition: 'top',
      horizontalPosition: 'right',
      maxNumber: 1
    });
  }]);

myApp.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider

    .state('index',{
        url: '/',
        templateUrl: 'static/partials/login.html',
        onEnter: function($state, auth){
          if(auth.isLoggedIn()){
            $state.go('home');
          }
        }
    })
    .state('home',{
        url: '/home',
        templateUrl: 'static/partials/loggedIn.html',
        controller:'mainController',
        onEnter: function($state, auth){
          if(!auth.isLoggedIn()){
            $state.go('index');
          }
        }
    })

});
