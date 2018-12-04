var myapp = angular.module('demoMongo',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});

myapp.controller('MongoRestController',function($scope,$http){
    $scope.predict = function() {
        var img=document.getElementById("image").value;
        var imgyh={
            "url":img
        };
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
            var req = $http.post('http://127.0.0.1:8080/predict', imgyh);
            req.success(function (data, status, headers, config) {
                $scope.message = data;
                console.log(data);
                var html="";
                var percentage="";
                for (var i = 0; i < data.length; i++) {
                    html+= "<tr><td>" + data[i].name + "" + "</td><td>"+data[i].value+""+"</td></tr>";
                    document.getElementById("Predict_result").innerHTML=html;
                }
            });
            req.error(function (data, status, headers, config) {
                alert("failure message: " + JSON.stringify({data: data}));
            });
    };
    $scope.GetData = function() {
        var img=document.getElementById("image").value;
        var imgyh={
            "url":img,
            "search":document.getElementById("search").value
        };
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        var req = $http.post('http://127.0.0.1:8080/get', imgyh);
        req.success(function (data, status, headers, config) {
            $scope.message = data;
            console.log(data);
            var searchdata="";
            searchdata+="<tr><td>" + data.name + "<br>"+ "</td><td>"+data.value+""+"</td></tr>";
            document.getElementById("searchimg").innerHTML=searchdata;
        });
        req.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
    };
    $scope.Delete = function() {
        var img=document.getElementById("image").value;
        var imgyh={
            "url":img,
            "search":document.getElementById("deletedata").value
        };
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        var req = $http.post('http://127.0.0.1:8080/del', imgyh);
        req.success(function (data, status, headers, config) {
            $scope.message = data;
            console.log(data);
        });
        req.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
    };
    $scope.EditData = function() {
        var img=document.getElementById("image").value;
        var imgyh={

            "search":document.getElementById("existingdata").value,
            "update":document.getElementById("update").value
        };
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        var req = $http.post('http://127.0.0.1:8080/edit', imgyh);
        req.success(function (data, status, headers, config) {
            $scope.message = data;
            console.log(data);
        });
        req.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
    }
});

