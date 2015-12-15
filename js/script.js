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
})();