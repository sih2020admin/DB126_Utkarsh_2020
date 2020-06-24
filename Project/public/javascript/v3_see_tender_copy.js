var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = mm+'/'+dd+'/'+yyyy;

$('#starting_date').attr('value', today);

// alert($('#starting_date ').attr('value'));


function filterData_date() {
    var filter_categories = []
    let department = []
    let closing_date = []
    let fee = []
    let filtered_result = []
    $.each($("input[type='checkbox']:checked"), function () {
        department.push($(this).val())
    })
    filter_categories.push(department)  
    console.log(filter_categories)
    $.each($("input[type='date']"), function () {
        closing_date.push($(this).val())
    })
    filter_categories.push(closing_date)
    console.log(filter_categories)
    $.each($("input[type='radio']:checked"), function () {
        fee.push($(this).val())
    })
    filter_categories.push(fee)
    console.log(filter_categories)
    for (let i = 0; i < response.length; i++) {

        // department
        if (filter_categories[0].length !== 0) {
            for (let j = 0; j < filter_categories[0].length; j++) {
                if (filter_categories[0][j] === response[0]['dept_name']) {
                    filtered_result.push(response)
                }
            }
        } else {
            filtered_result.push(response)
        }
    }
}

get_department()
