$('#approved_button').click(()=>{
    $('.details').hide()
    $('.approved_tenders').fadeTo('fast', 1)
})

$('#profile_button').click(()=>{
    $('.approved_tenders').hide()    
    $('.details').fadeTo('fast', 1)
})