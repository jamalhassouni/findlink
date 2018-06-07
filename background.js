console.log("background running");
/*
var ArrayLink = [];

window.addEventListener('load', function load(event) {
    chrome.storage.local.get(['links'], function (result) {
        links = JSON.parse(result.links);
        console.log(links.length);
        var countI = 1;
        for (var i = 0; i < links.length; i++) {
            fetch('http://localhost/extractUrl/fetch_url.php?link=' + links[i])
                .then((res) => res.json())
                .then(function (data) {
                    var OBJ = {
                        "url": data.url,
                        "title": data.title,
                        "Pagetitle": data.Pagetitle,
                        "PageDesc": data.PageDesc,
                        "image": data.image

                    };
                    ArrayLink.push(OBJ);
                    if(data.Pagetitle != null){
                        Title = data.Pagetitle ;
                    }else{
                        Title = data.title ;
                    }
                     console.log(data.url);
                     console.log(countI);
                     $("#list").append(`
                     <li><a class="alink" title="${data.url}" href="${data.url}" target="_blank">
                     ${countI}   : ${Title}
                      </a></li>
                     `);

                });

           countI++;
        }
        if(ArrayLink != ''){
            chrome.storage.local.set({
                'data': JSON.stringify(ArrayLink)
            }, function () {});
        }



    });

});
*/