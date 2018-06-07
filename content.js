/*global document,console,localStorage,setInterval,clearInterval,setTimeout,chrome */
(function () {
    var ArrayLink = [],
        textString;
    'use strict';
    chrome.storage.local.get(['textString'], function(result) {
         textString = JSON.parse(result.textString);

      });

    function LinkE() {
        var arlink = [];
        var allLinks = document.links;
        for (var i = 0; i < allLinks.length; i++) {
            arlink.push(allLinks[i].href);
        }
        var patterns = {
            // FUCK THESE 3 w's! >:(
            protocol: '^(http(s)?(:\/\/))?(www\.)?',
            domain: '[empireshort_\.]+'
        }; // /([www])?\.?((\w+)\.+)([a-zA-Z]{2,})/gi
        arlink.forEach(function (url) {
            var p = patterns;
            var pattern = new RegExp(p.protocol + p.domain, 'gi');
            var res = pattern.exec(url);
            if (res) {
                var found = '<span class="highlight">' + res[0] + '</span>';
                var input = res.input;
                console.log(input);
            }
        });

    }





    function selectlink() {

        var els = document.querySelectorAll("a[href^='"+textString+"']");
        console.clear();
        if (els.length > 0) {
            for (var i = 0, l = els.length; i < l; i++) {
                var el = els[i];
                ArrayLink.push(el.href);
                console.log(el.href, el.textContent);

            }
        } else {

            LinkE();
        }
        // Check browser support
        // Save it using the Chrome extension storage API.
        function filterSearch(text){
            var value,tagname,matchword,i;
            value = text.toUpperCase();
         matchword = document.getElementsByClassName('_1mf');
           for(i=0;i < matchword.length;i++){
             tagname = matchword[i].getElementsByTagName("span");
             if(tagname[0].innerHTML.toUpperCase().indexOf(value) > -1){
                 ArrayLink.push(matchword[i].textContent);
                console.log(matchword[i].textContent);

             }
           }
         }
         filterSearch(textString);
         function unique(list) {
            var result = [];
            $.each(list, function(i, e) {
                if ($.inArray(e, result) == -1) result.push(e);
            });
            return result;
        }
         if(ArrayLink != ''){
            chrome.storage.local.set({'links': JSON.stringify(unique(ArrayLink))}, function() {
            });
         }




    }


    let stateCheck = setInterval(() => {
        if (document.readyState === 'complete') {
            clearInterval(stateCheck);
           setTimeout(function () {
            selectlink();
            }, 5000);


        }
    }, 100);

})();