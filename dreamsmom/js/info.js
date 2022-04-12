window.onload = function() {
    var searchStr = location.search;
    searchStr = searchStr.substr(1);
    var searchs = searchStr.split("&");
    var ids = searchs[0].split("=");
    var this_url = document.baseURI.replace("info.html", "").replace("info", "").replace(location.search, "");
    var url = this_url + "DataBase/info/" + ids[1] + ".txt";
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.send(null);
    request.onloadend = function() {
        if (request.status == 200) {
            const lexer = new marked.Lexer();
            const tokens = lexer.lex(request.responseText);
            const parser = new marked.Parser();
            const html = parser.parse(tokens);
            document.getElementById("data").innerHTML = html;
        } else {
            alert("这里还没有写完哦~");
        }
    }
}