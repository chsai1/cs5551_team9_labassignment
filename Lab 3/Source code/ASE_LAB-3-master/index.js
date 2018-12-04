var myapp = angular.module('demoMongo',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});
myapp.controller('MongoRestController',function($scope,$http){
    $scope.insertData = function(){
        console.log($scope.user);
        console.log($scope.password);
        var dataParams = {
            'class ID' :$scope.user,
            'Student Name':$scope.password,
        };

        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        var req = $http.post('http://127.0.0.1:8080/register',$scope.formData);
        req.success(function(data, status, headers, config) {
            $scope.message = data;
            console.log(data);
            alert("Registered Successfully");
            window.location.href="home.html";
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };
    $scope.Login = function() {
        console.log($scope.user);
        console.log($scope.password);
        var dataParams = {
            'class ID': $scope.user,
            'Student Name': $scope.password,
        };
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        var req = $http.post('http://127.0.0.1:8080/login', $scope.formData);
        req.success(function (data, status, headers, config) {
            $scope.message = data;
            console.log(data);
            window.location.href="home.html";
        });
        req.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
    }
});