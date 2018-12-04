/**
 * Created by user on 23/10/2016.
 */
var myapp = angular.module('demo',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});
myapp.controller('Search',function($scope,$http){
    $scope.search = function(){
        };
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        var req = $http.post('http://127.0.0.1:8081/search',$scope.major);
        console.data("search function")
        req.success(function(data, status, headers, config) {
            $scope.message = data;
            console.log(data);
            $scope.result= data;
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
});

