window.onload = function() {
    loadTable();
    loadMeme();
    clock();
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
    a = $.ajax({
        url: "DataBase/meme.json",
        type: "GET",
        dataType: "json",
        async: false,
        success: function() {}
    });
    memeResult = $.parseJSON(a["responseText"]);
    memeCnt = 0;
    for (var {} in memeResult) memeCnt++;
    memeNo = Math.floor(Math.random() * memeCnt);
    document.getElementById("meme").innerText = "今日笑话：" + memeResult[memeNo]["data"];
    document.getElementById("memeAuthor").innerText = memeResult[memeNo]["author"] != "" ? "---" + memeResult[memeNo]["author"] : "";
}

function seeMemeDetail() {
    if (memeResult[memeNo]["url"] != "")
        window.open(memeResult[memeNo]["url"], "_blank");
}

function clock() {
    //yyyy/mm/dd hh:mm:ss
    var timerNode = document.getElementById("timer");
    var date = new Date();
    var string = "当前时间：" + betterShow(date.getFullYear(), 4) + "/" + betterShow(date.getMonth() + 1, 2) + "/" + betterShow(date.getDate(), 2) + " ";
    string += betterShow(date.getHours(), 2) + ":" + betterShow(date.getMinutes(), 2) + ":" + betterShow(date.getSeconds(), 2);
    timerNode.innerText = string;
}

function betterShow(num, digit) {
    var string = "";
    var num_string = num.toString();
    for (var i = 0; i < digit - num_string.length; i++)
        string += "0";
    string += num_string;
    return string;
}
setInterval(clock, 1000);