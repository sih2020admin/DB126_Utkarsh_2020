"use strict";
$('#approved_button').click(function () {
    $('.details').hide();
    $('.approved_tenders').fadeTo('fast', 1);  
    document.getElementById("profile_button").classList.remove("active");
    document.getElementById("approved_button").classList.add("active");
});
$('#profile_button').click(function () {
    $('.approved_tenders').hide();
    $('.details').fadeTo('fast', 1);
    document.getElementById("approved_button").classList.remove("active");
    document.getElementById("profile_button").classList.add("active");
});
