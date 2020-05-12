let text = '9e5dEKTQTuYkjrdAH';
let s = 0;
text.split('').map((c=>{
   s+= c.codePointAt(0);
}));

console.log(s);