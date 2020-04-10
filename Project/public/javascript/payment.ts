$('#bg_tsc_button').on('click', (e) => {
    e.preventDefault()
    let check_form = 0
    let amount = $('#amount1').val()?.toString()!
    let email = $('#email').val()?.toString()!
    let mobile = $('#mobile').val()?.toString()!
    check_form = form_validate(amount, email, mobile)
    if (check_form === 1) {
        $('#body_content').submit()
    }
})
function form_validate(amount: string, email: string, mobile: string) {
    console.log(amount, email, mobile)
    if (amount === '') {
        $('#error-para').text('Amount field cannot be empty')
        return 0
    }
    if (email === '') {
        $('#error-para').text('Email field cannot be empty')
        return 0
    }
    if (mobile === '') {
        $('#error-para').text('Mobile field cannot be empty')
        return 0
    }
    if (mobile.length < 10 || mobile.length > 10) {
        $('#error-para').text('Invalid Mobile Number')
        return 0
    }
    $('#error-para').text('Success')
    return 1
}
