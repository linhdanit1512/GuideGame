function encode(s) {
   return Buffer.from(s, 'utf8').toString('hex');
}

function decode(s) {
   return Buffer.from(s, 'hex').toString('utf-8');
}

module.exports = {
   encode: encode,
   decode: decode
}