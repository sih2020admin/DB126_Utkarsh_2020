"use strict";
$('#approved_button').click(() => {
    $('.details').hide();
    $('.statistics').hide();
    $('.approved_tenders').fadeTo('fast', 1);
});
$('#profile_button').click(() => {
    $('.approved_tenders').hide();
    $('.statistics').hide();
    $('.details').fadeTo('fast', 1);
});
$('#stat_button').click(() => {
    $('.details').hide();
    $('.approved_tenders').hide();
    $('.statistics').fadeTo('fast', 1);
});
