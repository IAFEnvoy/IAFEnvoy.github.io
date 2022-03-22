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

    for (i = 0; i < 8; i++) {
        var counter = 0;
        for (var {} in result[i]["data"]) {
            buttonNode = document.createElement("button");
            buttonNode.className = result[i]["data"][counter]["allow"];
            buttonNode.style.position = "absolute";
            buttonNode.style.marginLeft = (300 + 300 * counter) + "px";
            buttonNode.style.marginTop = (50 * i + 55) + "px";
            buttonNode.style.width = "300px";
            buttonNode.style.height = "50px";
            buttonNode.name = result[i]["data"][counter]["location"];

            buttonNode.onclick = function() {
                var url = document.baseURI.replace("index.html", "") + "info.html?location=" + this.name;
                window.open(url, "_blank");
            }

            roomNode = document.createElement("span");
            roomNode.className = "normalClass";
            roomNode.style.width = "300px";
            roomNode.innerHTML = result[i]["data"][counter]["location"] + " " + result[i]["data"][counter]["name"] + "<br/>" + result[i]["data"][counter]["stats"];
            buttonNode.appendChild(roomNode);

            table.appendChild(buttonNode);

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

function dxzp() {
    window.open("https://www.bilibili.com/video/BV1GJ411x7h7", "_blank");
}