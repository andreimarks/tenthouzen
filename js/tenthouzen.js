function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '../js/records.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);
}

function convertSecondsToHours(seconds) {
    return seconds / 3600;
}

function setContentText(value) {
    document.getElementById("content").textContent = value + " / 10,000 hours";
}

function setProgressBar(value) {
    var bar = document.getElementById("zazenprogress");
    var ariaValue = value * 100;
    var widthValue = "width: " + ariaValue + "%";
    bar.setAttribute("aria-valuenow", ariaValue);
    bar.setAttribute("style", widthValue);
}

loadJSON(function(json) {
    console.log(json);
    
    var hours = 0;
    
    for (let i = 0; i < json.length; i++) {
        hours += convertSecondsToHours(json[i]["duration"]);
    }
    
    setContentText(hours);
    progressValue = hours / 10000;
    setProgressBar(progressValue);
})
