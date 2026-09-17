$(document).ready(function(){
    $("#btn").click(function(){
        let div = $("#box");
        div.animate({top:"90vh",left: "5vw", width: "50px", height : "50px", backgroundColor: "red"},1000);
        div.animate({top:"65vh",left: "40vw", width: "200px", height : "200px",backgroundColor: "yellow"},3000);
        div.animate({top:"90vh",left: "93vw", width: "50px", height : "50px",backgroundColor: "yellow"},3000);
        div.animate({top:"10vh",left: "93vw", width: "50px", height : "50px", backgroundColor: "blue"},1000);
        div.animate({top:"10vh",left: "40vw", width: "200px", height : "200px", backgroundColor: "cyan"},3000);
        div.animate({top:"10vh",left: "5vw", width: "50px", height : "50px", backgroundColor: "cyan"},3000);
        div.animate({top:"10vh",left: "5vw", width: "200px", height : "200px", backgroundColor: "black"},3000);
    })
});