
angular.module('bi', [
  'ui.codemirror'
])

.controller('mainCtrl', ['$scope', ($scope) => {
  $scope.ref = {
    code: `
++++[>+++++<-]>[<+++++>-]+<+[
    >[>+>+<<-]++>>[<<+>>-]>>>[-]++>[-]+
    >>>+[[-]++++++>>>]<<<[[<++++++++<++>>-]+<.<[>----<-]<]
    <<[>>>>>[>>>[-]+++++++++<[>-<-]+++++++++>[-[<->-]+[<<<]]<[>+<-]>]<<-]<<-
]
[Outputs square numbers from 0 to 10000.
Daniel B Cristofani (cristofdathevanetdotcom)
http://www.hevanet.com/cristofd/brainfuck/]
`
  };
  $scope.editorOptions = {
    lineNumbers: true,
    theme: 'monokai',
    lineWrapping : true,
    height: 'auto'
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
