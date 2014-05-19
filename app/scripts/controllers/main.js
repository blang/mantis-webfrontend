'use strict';

angular.module('webfrontendApp')
  .controller('MainCtrl', function ($scope, $http) {
    // API
    $scope.endpoint = '127.0.0.1:9001';
    $scope.username = 'user';
    $scope.password = 'pass';
    $scope.connected = false;

    // Data Holder
    $scope.instances = [];
    $scope.extinstances = [];

    // Error Holder
    $scope.confInstErrorMsg = '';
    $scope.confExtInstErrorMsg = '';

    // Selected instances
    $scope.selInstance = {};
    $scope.selExtInstance = {};


    // Events
    $scope.$on('API:connected', function(){
      $scope.connected = true;
      $scope.GetInstances();
      $scope.GetExtInstances();
    });


    // Functions
    $scope.Login = function() {
      $http.defaults.headers.common.Authorization = 'Basic '+btoa($scope.username+':'+$scope.password);
      $http.get('http://'+$scope.endpoint+'/login').success(function (data){
        console.log('Connect data: ',data);
        $scope.$emit('API:connected');
      }).error(function(data, status, headers, config) {
        console.log('error', data, status, headers, config);
        $scope.connected = false;
        if (status === 401) {
          showErrorMessage('Wrong credentials');
        }else{
          showErrorMessage('Could not reach api');
        }
      });
    };

    $scope.GetInstances = function() {
      $http.get('http://'+$scope.endpoint+'/instance').success(function (data){
        console.log('Instances: ',data);
        $scope.instances = data;
        $('#instances').effect('highlight');
      }).error(function(data, status, headers, config) {
        console.log('error', data, status, headers, config);
        showErrorMessage('Error: '+data);
      });
    };

    $scope.GetExtInstances = function() {
      $http.get('http://'+$scope.endpoint+'/extinstance').success(function (data){
        console.log('ExtInstances: ',data);
        $scope.extinstances = data;
        $('#extinstances').effect('highlight');
      }).error(function(data, status, headers, config) {
        console.log('error', data, status, headers, config);
        showErrorMessage('Error: '+data);
      });
    };

    $scope.StartServer = function(instance) {
      $http.post('http://'+$scope.endpoint+'/instance/'+instance.id+'/startserver',{}).success(function (data){
        console.log('StartServer: ',data);
        $('#instances').effect('highlight');
      }).error(function(data, status, headers, config) {
        console.log('error', data, status, headers, config);
        showErrorMessage(data);
      });
    };

    $scope.StartHC = function(instance) {
      $http.post('http://'+$scope.endpoint+'/instance/'+instance.id+'/starthc',{}).success(function (data){
        console.log('StartHC: ',data);
        $('#instances').effect('highlight');
      }).error(function(data, status, headers, config) {
        console.log('error', data, status, headers, config);
        showErrorMessage(data);
      });
    };

    $scope.StopServer = function(instance) {
      $http.post('http://'+$scope.endpoint+'/instance/'+instance.id+'/stopserver',{}).success(function (data){
        console.log('StopServer: ',data);
        $('#instances').effect('highlight');
      }).error(function(data, status, headers, config) {
        console.log('error', data, status, headers, config);
        showErrorMessage(data);
      });
    };

    $scope.StopHC = function(instance) {
      $http.post('http://'+$scope.endpoint+'/instance/'+instance.id+'/stophc',{}).success(function (data){
        console.log('StopHC: ',data);
        $('#instances').effect('highlight');
      }).error(function(data, status, headers, config) {
        console.log('error', data, status, headers, config);
        showErrorMessage(data);
      });
    };

    $scope.ConfigureInstance = function(instance) {
      console.log('Instance:', instance);
      $scope.selInstance = instance;
      $('#configInstance').modal();
      $('#configInstance').modal('show');
    };

    $scope.InstanceSaveName = function(instance) {
      var postData = {
        'name': instance.name
      };
      $http.post('http://'+$scope.endpoint+'/instance/'+instance.id, postData).success(function (data){
        console.log('Instance: ',data);
        $('#confInstInputName').effect('highlight',{color: '#AEFFAB'},'slow');
        $scope.selInstance.name = data.name;
      }).error(function(data, status, headers, config) {
        console.log('error', data, status, headers, config);
        $('#confInstInputName').effect('highlight',{color: '#FF7A7A'},'slow');
        showInstConfErrorMessage(data.error);
      });
    };

    $scope.InstanceSaveServerMods = function(instance) {
      var postData = {
        'servermods': instance.servermods
      };
      $http.post('http://'+$scope.endpoint+'/instance/'+instance.id, postData).success(function (data){
        console.log('Instance: ',data);
        $('#confInstInputServerMods').effect('highlight',{color: '#AEFFAB'},'slow');
        $scope.selInstance.servermods = data.servermods;
      }).error(function(data, status, headers, config) {
        console.log('error', data, status, headers, config);
        $('#confInstInputServerMods').effect('highlight',{color: '#FF7A7A'},'slow');
        showInstConfErrorMessage(data.error);
      });
    };

    $scope.InstanceSaveHCMods = function(instance) {
      var postData = {
        'hcmods': instance.hcmods
      };
      $http.post('http://'+$scope.endpoint+'/instance/'+instance.id, postData).success(function (data){
        console.log('Instance: ',data);
        $('#confInstInputHCMods').effect('highlight',{color: '#AEFFAB'},'slow');
        $scope.selInstance.hcmods = data.hcmods;
      }).error(function(data, status, headers, config) {
        console.log('error', data, status, headers, config);
        $('#confInstInputHCMods').effect('highlight',{color: '#FF7A7A'},'slow');
        showInstConfErrorMessage(data.error);
      });
    };

    $scope.InstanceSaveClientMods = function(instance) {
      var postData = {
        'clientmods': instance.clientmods
      };
      $http.post('http://'+$scope.endpoint+'/instance/'+instance.id, postData).success(function (data){
        console.log('Instance: ',data);
        $('#confInstInputClientMods').effect('highlight',{color: '#AEFFAB'},'slow');
        $scope.selInstance.clientmods = data.clientmods;
      }).error(function(data, status, headers, config) {
        console.log('error', data, status, headers, config);
        $('#confInstInputClientMods').effect('highlight',{color: '#FF7A7A'},'slow');
        showInstConfErrorMessage(data.error);
      });
    };

    $scope.ConfigureExtInstance = function(instance) {
      console.log('ExtInstance:', instance);
      $scope.selExtInstance = instance;
      $('#configExtInstance').modal();
      $('#configExtInstance').modal('show');
    };

    $scope.ExtInstanceSave = function(instance) {
      var postData = instance;
      $http.post('http://'+$scope.endpoint+'/extinstance/'+instance.id, postData).success(function (data){
        console.log('ExtInstances: ',data);
        $('#configExtInstance').effect('highlight',{color: '#AEFFAB'},'slow');
        $scope.selExtInstance = data;
      }).error(function(data, status, headers, config) {
        console.log('error', data, status, headers, config);
        $('#configExtInstance').effect('highlight',{color: '#FF7A7A'},'slow');
        showExtInstConfErrorMessage(data.error);
      });
    };

    //Helper Functions
    function showErrorMessage(message) {
      $scope.errorMsg = message;
      $('#errorMsg').fadeIn(1000).delay(3000).fadeOut(1000);
    }

    function showInstConfErrorMessage(message) {
      $scope.confInstErrorMsg = message;
      $('#confInstError').fadeIn(1000).delay(3000).fadeOut(1000);
    }

    function showExtInstConfErrorMessage(message) {
      $scope.confExtInstErrorMsg = message;
      $('#confExtInstError').fadeIn(1000).delay(3000).fadeOut(1000);
    }
  });
