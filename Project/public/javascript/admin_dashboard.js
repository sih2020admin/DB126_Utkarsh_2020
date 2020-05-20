"use strict";
$('#approved_button').click(function () {
    $('.details').hide();
    $('.approved_tenders').fadeTo('fast', 1);
});
$('#profile_button').click(function () {
    $('.approved_tenders').hide();
    $('.details').fadeTo('fast', 1);
});
