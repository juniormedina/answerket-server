function randomChars(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getDate() {
  let event = new Date();
  let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return event.toLocaleDateString('en-us', options);
}

function getTime() {
  let event = new Date();
  return (
    ('0' + event.getHours()).slice(-2) +
    ':' +
    ('0' + event.getMinutes()).slice(-2) +
    ':' +
    ('0' + event.getSeconds()).slice(-2)
  );
}

module.exports = {
  randomChars,
  getDate,
  getTime
};
