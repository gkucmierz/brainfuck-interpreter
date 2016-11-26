
angular.module('bi', [
  'ui.codemirror',
  'ui.bootstrap'
])

.controller('mainCtrl', ['$scope', '$http', '$timeout', ($scope, $http, $timeout) => {
  $scope.ref = {
    code: ``,
    processing: false,
    outputType: 'string',
    output: {
      string: '',
      hex: ''
    }
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

  const dec2hex = (n, p = 2) => {
    return ('0'.repeat(p) + n.toString(16)).slice(-p);
  };

  const displayOutput = (arr) => {
    $scope.ref.output.string = arr.map(n => String.fromCharCode(n)).join('');
    $scope.ref.output.hex = arr.map(n => dec2hex(n)).join(' ');
  };

  $scope.run = function() {
    $scope.ref.processing = true;
    displayOutput([]);

    let worker = new Worker('dist/workers/worker.js');

    worker.postMessage([$scope.ref.code, $scope.ref.input]);

    let output = [];
    let timeout;
    (function loop() {
      displayOutput(output);
      timeout = $timeout(loop, 200);
    }());

    worker.onmessage = (msg) => {
      let [type, data] = msg.data.split(',');

      if (type === 'data') {
        output.push(+data);
      } else if (type === 'end') {
        $scope.$apply(() => {
          $scope.ref.processing = false;
          displayOutput(output);
        });
        $timeout.cancel(timeout);
        worker.terminate();
      }
    };
  };
  
  $scope.clean = function() {
    $scope.ref.input = '';
    displayOutput([]);
  };

}])

;
