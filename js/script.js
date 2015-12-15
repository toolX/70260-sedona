(function() {
    var elements = document.querySelectorAll(".numerator-body");

    for (var i = 0; i < elements.length; i++) {
        initNumberField(elements[i]);
    }

    function initNumberField(parent) {
        var input = parent.querySelector("input");
        var minus = parent.querySelector(".numerator-body__link--minus");
        var plus = parent.querySelector(".numerator-body__link--plus")

        minus.addEventListener("click", function() {
            event.preventDefault();
            changeNumber(false);
        });

        plus.addEventListener("click", function() {
            event.preventDefault();
            changeNumber(true);
        });

        function changeNumber(operation) {
            var value = Number(input.value);

            if (isNaN(value)) {
                value = 0;
            }

            if (operation) {
                input.value = value + 1;
            }
            else {
                input.value = value - 1;
                if (value == 0) {
                    input.value = 0;
                }
            }
        }
    }
    
    if (!("FormData" in window)) {
        return;
    }
    
    var form = document.querySelector("form");
    var formLink = document.querySelector(".form-button");
    
    formLink.addEventListener("click", function(event) {
        event.preventDefault();
        
        var data = new FormData(form);
        
        request(data, function(response) {
            console.log(response);
        });   
    });
        
    function request(data, fn) {
        var xhr = new XMLHttpRequest();
        var time = (new Date()).getTime();

        xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + time);
        xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState == 3) {
                formLink.popup.classList.add("form-button--blink");
            }
            if (xhr.readyState == 4) {
                fn(xhr.responseText);
            }   
        });
        
        xhr.send(data);
    }
})();