(function() {
    var elements = document.querySelectorAll(".numerator-body");

    for (var i = 0; i < elements.length; i++) {
        initNumberField(elements[i]);
    }

    function initNumberField(parent) {
        var input = parent.querySelector("input");
        var minus = parent.querySelector(".numerator-body__link--minus");
        var plus = parent.querySelector(".numerator-body__link--plus");

        minus.addEventListener("tap", function(event) {
            event.preventDefault();
            changeNumber(false);
        });
        
        plus.addEventListener("tap", function(event) {
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
    var popupOk = document.querySelector(".form-message--ok");
    var popupError = document.querySelector(".form-message--error");
    var popupErrorClose = document.querySelector(".form-message__button--error");
    var popupOkClose = popupOk.querySelector(".form-message__button--ok");
    isOpenOk = false;
    isOpenError = false;
    
    formLink.addEventListener("tap", function(event) {
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
            switch (xhr.readyState) {
                case 1:
                case 2:
                case 3:
                    formLink.classList.add("form-button--blink");
                    break;
                case 4:
                    fn(xhr.responseText);
                    popupOk.classList.add("form-message--show");
                    isOpenOk = true;
                    break;
                default:
                    popupError.classList.add("form-message--show");
                    isOpenError = true;
                    break;
            }
        });
        
        xhr.send(data);
    }
    popupOkClose.addEventListener("tap", function(event)
            {
            if (isOpenOk === true) {
                event.preventDefault();
                popupOk.classList.remove("form-message--show");
                isOpenOk = false;
                } 
        });
    popupErrorClose.addEventListener("tap", function(event)
            {
            if (isOpenError === true) {
                event.preventDefault();
                popupError.classList.remove("form-message--show");
                isOpenError = false;
                } 
        });
})();