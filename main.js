var Title, Ptitle, Desc, img, links;
var input = document.querySelector("#text-input"),
    saveButton = document.querySelector("#save"),
    List = document.querySelector("#list"),
    resultfinal,
    textString,
    ArrayLink = [];
saveButton.addEventListener("click", function() {
    resultfinal = input.value;
    chrome.storage.local.set({
        'textString': JSON.stringify(resultfinal)
    }, function() {});
});
chrome.storage.local.get(['textString'], function(result) {
    textString = JSON.parse(result.textString);
    input.value = JSON.parse(result.textString);

});

chrome.storage.local.get(['links'], function(result) {
    links = JSON.parse(result.links);
    console.log('links is : ', links);
    List.innerHTML = `
    <li id="showMsg"><a class="alink" title="" href="" target="_blank">
    Loading content ...             </a></li>
    `;
    for (var i = 0; i < links.length; i++) {
        getdata(i);


    }
    if (ArrayLink != '') {
        chrome.storage.local.set({
            'data': JSON.stringify(ArrayLink)
        }, function() {});
    }


});

async function getdata(link) {
    const res = await fetch(`http://localhost/extractUrl/fetch_url.php?link=${links[link]}`);
    const json = await res.json();
    List.innerHTML = "";
    let OBJ = {
        "url": json.url,
        "title": json.title,
        "Pagetitle": json.Pagetitle,
        "PageDesc": json.PageDesc,
        "image": json.image

    };

    ArrayLink.push(OBJ);
    // TODO : fix list view 
    List.innerHTML = ArrayLink.map(createList);

}

function createList(list) {
    let Title = list.Pagetitle || list.title;
    return ` <li><a class="alink" title="${list.url}" href="${list.url}" target="_blank">
         ${Title}</a></li>`;

}
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