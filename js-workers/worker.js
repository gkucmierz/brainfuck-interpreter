
importScripts('brainfuck.js');

onmessage = (msg) => {
  let [code, input] = msg.data;
  let compiled = brainfuckCompiler.compile(code);

  compiled.run(input, num => {
    postMessage(['data', num].join(','));
  });

  postMessage('end');
};


