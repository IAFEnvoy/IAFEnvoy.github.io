window.onload = function() {
    loadTable();
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
            roomNode.style.marginLeft = (300 + 300 * counter) + "px";
            roomNode.style.marginTop = (50 * i + 5) + "px";
            var url = document.baseURI.replace("index.html", "") + "Info/index.html?location=" + result["data"][i]["data"][counter]["location"]
            roomNode.innerHTML = "<a href=" + url + " target='_blank'>" + result["data"][i]["data"][counter]["location"] + " " + result["data"][i]["data"][counter]["name"] + "</a>";
            table.appendChild(roomNode);

            statsNode = document.createElement("div");
            statsNode.className = "normalClass";
            statsNode.style.position = "absolute";
            statsNode.style.marginLeft = (300 + 300 * counter) + "px";
            statsNode.style.marginTop = (50 * i + 25) + "px";
            statsNode.innerText = result["data"][i]["data"][counter]["stats"];
            table.appendChild(statsNode);

            counter++;
        }
    }
}