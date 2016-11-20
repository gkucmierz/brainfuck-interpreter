'use strict';

angular.module('bi', [
  'ui.codemirror'
])

.controller('mainCtrl', ($scope) => {
  $scope.ref = {
    code: `
Hello World! from Wikipedia:

++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.
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

})

;
