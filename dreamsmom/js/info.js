window.onload = function() {
    let searchStr = location.search;
    searchStr = searchStr.substring(1);
    let searchs = searchStr.split("&");
    let category=searchs[0];
    let id = searchs[1];
    let url = `DataBase/${category}/${id}.txt`;
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.send(null);
    request.onloadend = function() {
        if (request.status == 200) {
            const lexer = new marked.Lexer();
            const tokens = lexer.lex(request.responseText);
            const parser = new marked.Parser();
            const html = parser.parse(tokens);
            document.getElementById("data").innerHTML = html;
        } else 
            alert("这里还没有写完哦~");
    }
}