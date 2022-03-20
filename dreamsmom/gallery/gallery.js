window.onload = function() {
    var this_url = document.baseURI.replace("gallery.html", "").replace(location.search, "");
    var url = this_url + "data.txt";
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