window.onload = function() {
    loadTable();
    loadMeme();
}

function loadTable() {
    a = $.ajax({
        url: "data.json",
        type: "GET",
        dataType: "json",
        async: false,
        success: function() {}
    });
    result = $.parseJSON(a["responseText"]);
    table = document.getElementById("table");

    titleNode = document.createElement("div");
    titleNode.id = "title";
    titleNode.className = "titleClass";
    titleNode.style.marginLeft = "200px";
    titleNode.innerText = result["title"];
    table.appendChild(titleNode);

    for (i = 0; i < 8; i++) {
        floorNode = document.createElement("div");
        floorNode.className = "floorClass";
        floorNode.style.position = "absolute";
        floorNode.style.marginLeft = "50px";
        floorNode.style.marginTop = (50 * i + 10) + "px";
        floorNode.innerText = result["data"][i]["floor_name"];
        table.appendChild(floorNode);

        utilNode = document.createElement("div");
        utilNode.className = "utilClass";
        utilNode.style.position = "absolute";
        utilNode.style.marginLeft = "130px";
        utilNode.style.marginTop = 50 * i + "px";
        utilNode.innerText = result["data"][i]["floor_util"];
        table.appendChild(utilNode);

        var counter = 0;
        for (var {} in result["data"][i]["data"]) {
            roomNode = document.createElement("div");
            roomNode.className = "normalClass";
            roomNode.style.position = "absolute";
            roomNode.style.marginLeft = (315 + 300 * counter) + "px";
            roomNode.style.marginTop = (50 * i + 5) + "px";
            roomNode.style.width = "300px";
            var url = document.baseURI.replace("index.html", "") + "info.html?location=" + result["data"][i]["data"][counter]["location"]
            roomNode.innerHTML = "<a href=" + url + " target='_blank'>" + result["data"][i]["data"][counter]["location"] + " " + result["data"][i]["data"][counter]["name"] + "</a>";
            table.appendChild(roomNode);

            statsNode = document.createElement("div");
            statsNode.className = "normalClass";
            statsNode.style.position = "absolute";
            statsNode.style.marginLeft = (315 + 300 * counter) + "px";
            statsNode.style.marginTop = (50 * i + 25) + "px";
            statsNode.style.width = "300px";
            statsNode.innerText = result["data"][i]["data"][counter]["stats"];
            table.appendChild(statsNode);

            counter++;
        }
    }
    background = document.getElementById("background");
    for (i = 0; i < 8; i++) {
        var counter = 0;
        for (var {} in result["data"][i]["data"]) {
            backcolorNode = document.createElement("div");
            backcolorNode.className = result["data"][i]["data"][counter]["allow"];
            backcolorNode.style.position = "absolute";
            backcolorNode.style.marginLeft = (300 + 300 * counter) + "px";
            backcolorNode.style.marginTop = (50 * i + 55) + "px";
            backcolorNode.style.width = "300px";
            backcolorNode.style.height = "50px";
            backcolorNode.innerText = "";
            background.appendChild(backcolorNode);

            counter++;
        }
    }
}

function loadMeme() {
    var this_url = document.baseURI.replace("info.html", "").replace(location.search, "");
    var url = this_url + "DataBase/meme.txt";
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.send(null);
    request.onloadend = function() {
        if (request.status == 200) {
            var data = request.responseText.split("\n");
            memecnt = Math.floor(Math.random() * data.length);
            document.getElementById("meme").innerText = "今日笑话：" + data[memecnt];
        } else {
            document.getElementById("meme").innerText = "完蛋，我想不出笑话了";
        }
    }
}

function seeMemeDetail() {
    if (memecnt == 2) {
        var this_url = document.baseURI.replace("info.html", "").replace(location.search, "");
        window.open(this_url + "info.html?location=history", "_blank");
    } else {
        alert("这里还没做完哦~");
    }
}