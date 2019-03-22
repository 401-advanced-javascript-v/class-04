'use strict';
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

module.exports = exports ={};

const nameArray = ['Albert', 'Natalie', 'Vanessa'];

const loopName = (nameArray) =>{
  nameArray.forEach(name => {
    name = bufferFrom(name);
    console.log(name);
  });
};

const bufferFrom = (string) => {
  let bufferArray = [];
  for(let i=0; i< string.length; i ++){        
    let buffer = string.charCodeAt(i);
    bufferArray.push(buffer);
  }
  return bufferArray;
};

loopName(nameArray);

readFile(`${__dirname}/pair-programming.txt`)
  .then(data =>{
    console.log(data);
    writeFile(`${__dirname}/pair-programming.html`, wrapHtml(data));
  })
  .catch(error => console.log(error));

const wrapHtml = (buffer) => {
  let buf1 = Buffer.alloc(13);
  let buf2 = Buffer.alloc(9);
  let par1 = buffer.slice(0,30);
  console.log(par1);
  buf1.writeInt16BE('60 97 114 116 105 99 108 101 62 60 104 50 62', 0, 13);
  buf2.writeInt16BE('60 47 104 50 62 60 117 108 62', 0, 9);
  let totalLength =buf1.length + par1.length + buf2.length;

  let bufA = Buffer.concat([buf1, par1 ,buf2],totalLength);
    
  console.log(bufA);
  /**
     * <article> & <h2> for paragragh1
     */
  buffer.writeIntBE('60 97 114 116 105 99 108 101 62 60 104 50 62', 0, 6);
  let cursor = buffer.indexOf('\n');
  console.log(cursor);
  /**
     * </h2> & <ul>
     */
  buffer.writeIntBE('60 47 104 50 62 60 117 108 62', cursor, 2);
  console.log(buffer);
  console.log(buffer.indexOf('60 104 50 62'));
  /**
     * </ul> & <h2> paragragh2
     */
  let cursor1 = buffer.indexOf('\n\n');
  console.log(cursor1);
  buffer.writeIntBE('60 47 117 108 62 60 104 50 62', cursor1, 2);
  /**
     * </h2> & <ul> paragragh2
     */
  let cursor2 = buffer.indexOf('\n',cursor1);
  console.log(cursor2);
  buffer.writeIntBE('60 47 104 50 62 60 117 108 62', cursor2, 2);
  /**
     * </ul> & <h2> paragragh2
     */
  let cursor3 = buffer.indexOf('\n\n', cursor2);
  console.log(cursor3);
  buffer.writeIntBE('60 47 117 108 62 60 104 50 62', cursor3, 2);
  /**
     * </h2> & <ul> paragragh 3
     */
  let cursor4 = buffer.indexOf('\n', cursor3);
  console.log(cursor4);
  buffer.writeIntBE('60 47 104 50 62 60 117 108 62', cursor3, 2);
	
  return buffer;
};