$(document).ready(function () {

    $("#card").hover(
        function () {
            $(this).css({
                "background-color": "red",
                "color": "white"
            });
        },
        function () {
            $(this).css({
                "background-color": "white",
                "color": "black"
            });
        }
    );

    $("#qr").click(function () {
        $("#show").show();
    });

});