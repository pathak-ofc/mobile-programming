$(document).ready(function () {
    $("#show-name").click(function () {
        let name = $("#student-name").text();
        $("#output").text(name);
    });
    $("#change-name").click(function () {
        $("#student-name").text("Bimal Pathak");
    });
    $("#show-bio").click(function () {
        let bio = $("#student-bio").html();
        $("#output").html(bio);
    });
    $("#get-input").click(function () {
        let val = $("#nickname-input").val();
        console.log(val)
        $("#output").text(val);
    });
    $("#set-input").click(function () {
        $("#nickname-input").val("jQuery Pro");
    });

})