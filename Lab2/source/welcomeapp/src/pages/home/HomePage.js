angular.module('MyModule',[])
    .controller('MyController', function ($scope,$http) {

      $scope.scanBarCode = function () {
        document.addEventListener("deviceready", function () {

          $cordovaBarcodeScanner
            .scan()
            .then(function (result) {
              alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
            }, function (error) {
              alert("Scanning failed: " + error);
            });


          // NOTE: encoding not functioning yet
          $cordovaBarcodeScanner
            .encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com")
            .then(function (success) {
              // Success!
            }, function (error) {
              // An error occurred
            });

        }, false);
      };

      $scope.getVideosOnClick = function() {
        var speakup = "Fetching top 20 relevant videos in web for "+$scope.data.query;
        console.log(speakup);
        var msg = new SpeechSynthesisUtterance(speakup);
        window.speechSynthesis.speak(msg);

        $ionicLoading.show({
          template: '<p>Loading ' + $scope.data.query + '...</p><ion-spinner></ion-spinner>'
        });
        $scope.youtubeParams.q = $scope.data.query;
        $scope.videos = [];
        $http.get('https://www.googleapis.com/youtube/v3/search', {params:$scope.youtubeParams}).success(function(response){
          angular.forEach(response.items, function(child){
            $scope.videos.push(child);
          });
          $q.all($scope.videos).then(function () {
            console.log($scope.videos);
            $ionicLoading.hide();
          });
        });
      };

      $scope.getDetails = function(){

        var item = $scope.search;
        alert(item);
        document.getElementById("notes").innerHTML = "";
        $http.get("https://api.uclassify.com/v1/uClassify/Sentiment/classify/?readKey=U9LDimHjiiOQ&text="+item).success(function (response) {
          console.log(response);

          document.getElementById("notes").innerHTML ="Positive Sentiment : "+ response.positive +"<br/>"+"Negative Sentiment : "+response.negative;
        }).error(function (){
          alert("There was some error processing your request. Please try after some time.")
        });


      }





    });
