'use strict';

const fs = require('fs');

class CodeGenerator {
  constructor(code) {
    this.code = code;
    this.buffer = Buffer.from('');
  }

  addCharacter(char) {
    let newBuffer = Buffer.from(char);
    this.buffer = Buffer.concat([this.buffer, newBuffer]);
  }

  generate() {
    this.code.split('').forEach(char => {this.addCharacter(char);});
  }
}

let rawCode = "'use strict'; let arr =[Natalie, Albert, Vanessa]; for(let name of arr) { console.log(name);}";

let code = new CodeGenerator(rawCode);
code.generate();

fs.writeFile('.loop.js', code.buffer, (err,data) => {
  if( err ){throw err;}
  console.log('Created loop.js');
});