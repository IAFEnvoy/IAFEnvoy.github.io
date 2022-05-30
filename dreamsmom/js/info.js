window.onload = function () {
  let searchStr = location.search;
  searchStr = searchStr.substring(1);
  let searchs = searchStr.split("&");
  let category = searchs[0];
  let id = searchs[1];
  let url = id == undefined ? `DataBase/${category}.txt` : `DataBase/${category}/${id}.txt`;
  let request = new XMLHttpRequest();
  request.open("GET", url);
  request.send(null);
  request.onloadend = function () {
    if (request.status == 200)
      document.getElementById("data").innerHTML = new marked.Parser().parse(new marked.Lexer().lex(request.responseText));
    else
      alert("这里还没有写完哦~");
  }
}