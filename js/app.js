
angular.module('bi', [
  'ui.codemirror'
])

.controller('mainCtrl', ['$scope', '$http', ($scope, $http) => {
  $scope.ref = {
    code: ``
  };
  $scope.editorOptions = {
    lineNumbers: true,
    theme: 'monokai',
    lineWrapping : true,
    height: 'auto'
  };

  $http.get('dist/examples.json').then((res) => {
    $scope.ref.examples = res.data.map(ex => ({name: ex}));
  }, (e) => {
    alert('failed loading examples');
  });

  $scope.load = () => {
    $http.get('examples/' + $scope.ref.example.name).then((res) => {
      $scope.ref.code = res.data;
    }, (e) => {
      alert('failed loading example');
    });
  };

  let worker = new Worker('dist/workers/worker.js');
  // worker.terminate();

  worker.onmessage = (msg) => {
    $scope.$apply(() => $scope.ref.output = msg.data);
  };

  $scope.run = function() {
    $scope.ref.output = 'Loading...';
    worker.postMessage([$scope.ref.code, $scope.ref.input]);
  };
  
  $scope.clean = function() {
    $scope.ref.input = '';
    $scope.ref.output = '';
  };

}])

;
