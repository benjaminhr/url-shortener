var alphabet = "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
var base = alphabet.length

var encoded = function(num) {
  var encoded = ''
  while (num) {
    var remainder = num % base
    num = Math.floor(num / base)
    encoded = alphabet[remainder] + encoded // took out .toString()
  }
  return encoded
}

var decoded = function(str) {
  var decoded = 0
  while (str) {
    var index = alphabet.indexOf(str[0])
    var power = str.length - 1
    decoded += index * (Math.pow(base, power));
    str = str.substring(1);
  }
  return decoded
}

exports.encode = encoded;
exports.decode = decoded;