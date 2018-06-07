var Title, Ptitle, Desc, img, links;
var input = $("#text-input"),
    saveButton = $("#save"),
    resultfinal,
    textString,
    ArrayLink = [],
    countI = 1;
saveButton.on("click", function () {
    console.log(input.val());
    resultfinal = input.val();
    chrome.storage.local.set({
        'textString': JSON.stringify(resultfinal)
    }, function () {
        console.log('Value is set to ' + resultfinal);
    });
});
chrome.storage.local.get(['textString'], function (result) {
    textString = JSON.parse(result.textString);
    input.val(JSON.parse(result.textString));

});

chrome.storage.local.get(['links'], function (result) {
    links = JSON.parse(result.links);
    $("#list").append(`
    <li id="showMsg"><a class="alink" title="" href="" target="_blank">
    Loading content ...             </a></li>
    `);
    for (var i = 0; i < links.length; i++) {
        console.log("No: "+countI);
        fetch('http://localhost/extractUrl/fetch_url.php?link=' + links[i])
            .then((res) => res.json())
            .then(function (data) {
                $('#showMsg').remove();
                var OBJ = {
                    "url": data.url,
                    "title": data.title,
                    "Pagetitle": data.Pagetitle,
                    "PageDesc": data.PageDesc,
                    "image": data.image

                };
                if(data.Pagetitle != null){
                    Title = data.Pagetitle ;
                }else{
                    Title = data.title ;
                }
                ArrayLink.push(OBJ);

                $("#list").append(`
                <li><a class="alink" title="${data.url}" href="${data.url}" target="_blank">
                ${countI}   : ${Title}
                 </a></li>
                `);
                countI++;

            });



    }
    if (ArrayLink != '') {
        chrome.storage.local.set({
            'data': JSON.stringify(ArrayLink)
        }, function () {});
    }



});

/*

chrome.storage.local.get(['data'], function (result) {
    data = JSON.parse(result.data);
    var countI = 1;
    for (var i = 0; i < data.length; i++) {
        $("#list").append(`
   <li><a class="alink" href="${data[i].url}" target="_blank">
   ${countI}   : ${data[i].Pagetitle}
    </a></li>
    <span>${data[i].url}</span>
   `);


        countI++;
    }


});*/