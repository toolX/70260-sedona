(function() { 
    var mobileMenuOpen = document.querySelector(".page-header__toggle--open");
    var mobileMenuClose = document.querySelector(".page-header__toggle--close");
    var nav = document.querySelector(".main-navigation");
    isMenuOpen = false;
    mobileMenuOpen.addEventListener("tap", function(event) {
            if (isMenuOpen == false) {
                nav.classList.add("menu-show");
                isMenuOpen = true;
    }
    });
    mobileMenuClose.addEventListener("tap", function(event) {
            if (isMenuOpen == true) {
                nav.classList.remove("menu-show");
                isMenuOpen = false;
    }
    });
})();