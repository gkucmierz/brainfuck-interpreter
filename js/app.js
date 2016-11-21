
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

  $scope.run = function() {
    let compiled = brainfuckCompiler.compile($scope.ref.code);
    $scope.ref.output = compiled.run($scope.ref.input);
  };
  
  $scope.clean = function() {
    $scope.ref.input = '';
    $scope.ref.output = '';
  };

}])

;
