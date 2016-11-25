
importScripts('brainfuck.js');

onmessage = (msg) => {
  let [code, input] = msg.data;
  let compiled = brainfuckCompiler.compile(code);

  compiled.run(input, (n, char) => {
    postMessage(['data', char].join(','));
  });

  postMessage('end');
};


