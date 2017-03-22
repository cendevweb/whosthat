angular.module('whosthat.controllers', ['ngCordova',])

.controller('HomeCtrl', function($scope,loadingService,photoService,$cordovaFileTransfer,FaceCompare,WikiFactory,$rootScope,$state) {

  loadingService.show();

  ionic.Platform.ready(function(){
      // will execute when device is ready, or immediately if the device is already ready.
      loadingService.hide();
});


$scope.tout= function(){
  photoService.takePhoto().then(function(response){
      photoService.uploadPhoto(response);
    });
}

$scope.name = "Jean Dujardin";
$scope.infos = {};
$scope.wiki= function(){
  WikiFactory.get($scope.name).then(function(response){
      $rootScope.infos = response;
      console.log($rootScope.infos)
      $state.go('results');
    });
}

$scope.compare= function(){
  FaceCompare.compare().then(function(response){
      FaceCompare.confidenceCheck(response);
  });
};


})


.controller('ResultsCtrl', function($scope,$cordovaCamera,$rootScope,$cordovaFileTransfer,$cordovaInAppBrowser) {
  $scope.openLink = function(){
    $scope.articleName = $rootScope.infos.title.replace(' ','_');
    $scope.link = "https://fr.wikipedia.org/wiki/"+$scope.articleName;
    console.log($scope.link)
    var options = {
        location: 'yes',
        clearcache: 'yes',
        toolbar: 'no'
      };
      document.addEventListener("deviceready", function () {

      $cordovaInAppBrowser.open($scope.link , '_blank', options)
        .then(function(event) {
          // success
        })
        .catch(function(event) {
          // error
        });

        }, false);
      };

});
