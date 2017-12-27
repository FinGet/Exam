//获取sessionStorage
function getSessionStorage(key, format) {
  var data;
  if (sessionStorage.getItem(key)) {
    if (format == 'json') {
      data = JSON.parse(sessionStorage.getItem(key));
    } else {
      data = sessionStorage.getItem(key);
    }
  } else {
    data = false
  }
  return data;
}
//写入sessionStorage
function setSessionStorage(key, content, format) {
  var data;
  if (format == 'json') {
    data = JSON.stringify(content);
  } else {
    data = content;
  }
  sessionStorage.setItem(key, data);
}
export var mySessionStorage = {
  get: getSessionStorage,
  set: setSessionStorage
}
