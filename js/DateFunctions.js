
//date of initial position and velocity from Nasa data

var current_date = new Date("November 26, 2017 00:00:00");


function updateDate(){
    current_date.setSeconds(current_date.getSeconds() + (dt*iterations));
    printDate();
}


function printDate(){

    $('#date').text('Earth date ' + current_date.getFullYear() + '-' + (current_date.getMonth() +1) + '-' + current_date.getDate() + '');

}