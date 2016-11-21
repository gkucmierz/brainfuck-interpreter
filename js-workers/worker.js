
importScripts('brainfuck.js');

onmessage = (msg) => {
  let [code, input] = msg.data;
  let compiled = brainfuckCompiler.compile(code);
  let output = compiled.run(input);
  postMessage(output);
};


