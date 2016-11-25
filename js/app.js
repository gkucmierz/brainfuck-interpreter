
angular.module('bi', [
  'ui.codemirror'
])

.controller('mainCtrl', ['$scope', '$http', '$timeout', ($scope, $http, $timeout) => {
  $scope.ref = {
    code: ``,
    processing: false
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

  $scope.run = function() {
    $scope.ref.processing = true;
    $scope.ref.output = '';

    let worker = new Worker('dist/workers/worker.js');

    worker.postMessage([$scope.ref.code, $scope.ref.input]);

    let output = [];
    let timeout;
    (function loop() {
      $scope.ref.output = output.join('');
      timeout = $timeout(loop, 200);
    }());

    worker.onmessage = (msg) => {
      let [type, data] = msg.data.split(',');

      if (type === 'data') {
        output.push(data);
      } else if (type === 'end') {
        $scope.$apply(() => {
          $scope.ref.processing = false;
          $scope.ref.output = output.join('');
        });
        $timeout.cancel(timeout);
        worker.terminate();
      }
    };
  };
  
  $scope.clean = function() {
    $scope.ref.input = '';
    $scope.ref.output = '';
  };

}])

;
