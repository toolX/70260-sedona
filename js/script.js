(function() {
    var elements = document.querySelectorAll(".numerator-body");

    for (var i = 0; i < elements.length; i++) {
        initNumberField(elements[i]);
    }

    function initNumberField(parent) {
        var input = parent.querySelector("input");
        var minus = parent.querySelector(".numerator-body__link--minus");
        var plus = parent.querySelector(".numerator-body__link--plus")

        minus.addEventListener("tap", function() {
            event.preventDefault();
            changeNumber(false);
        });

        plus.addEventListener("tap", function() {
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
    
    var mobileMenuOpen = document.querySelector(".page-header__toggle--open");
    var mobileMenuClose = document.querySelector(".page-header__toggle--close")
    var nav = document.querySelector(".main-navigation");
    isMenuOpen = false;
    mobileMenuOpen.addEventListener("tap", function(event)
        {
            if (isMenuOpen === false) {
                nav.classList.add("menu-show");
                isMenuOpen = true;
            }
    });
    mobileMenuClose.addEventListener("tap", function(event)
        {
            if (isMenuOpen === true) {
                nav.classList.remove("menu-show");
                isMenuOpen = false;
            }
    });
    
    if (!("FormData" in window)) {
        return;
    }
    
    var form = document.querySelector("form");
    var formLink = document.querySelector(".form-button");
    var popupOk = document.querySelector(".form-message--ok");
    var popupError = document.querySelector(".form-message--error");
    var popupOkClose = popupOk.querySelector(".form-message__button--ok");
    isOpen = false;
    
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
            if (xhr.readyState == 3) {
                formLink.popup.classList.add("form-button--blink");
            }
            if (xhr.readyState == 4) {
                fn(xhr.responseText);
                popupOk.classList.add("form-message--show");
                isOpen = true;
            }
            else {
                popupError.classList.add("form-message--show");
            }
        });
        
        xhr.send(data);
    }
    popupOkClose.addEventListener("submit", function(event)
            {
            if (isOpen === true) {
                event.preventDefault();
                popupOk.classList.remove("form-message--show");
                isOpen = false;
                } 
        });
})();