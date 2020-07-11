import connection from './../connections/connection'
export async function getStates() {
    let states: any = await connection.execute('select st_name from states')
    return states[0]
}
export async function getLegalStatus() {
    let legal_status: any = await connection.execute('select l_name from legal_status_details')
    return legal_status[0]
}
export async function getYears() {
    let years = []
    const end_year: number = 1700
    const current_year: number = new Date().getFullYear()
    for (var i: number = current_year; i >= end_year; i--) {
        years.push(i)
    }
    return years
}
