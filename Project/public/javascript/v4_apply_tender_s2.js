function next(){

}
var status = "100"

var data = JSON.stringify({"et_id":et_id,"etd_id":etd_id});var xhr = new XMLHttpRequest();
        // xhr.withCredentials = true;

        xhr.onload = function () {
          if (this.status === 200) {
            console.log(this.responseText);

            response = JSON.parse(this.responseText);
            // var cont_div = document.getElementById('conts');

            status = response.status
            // 000 = 0
            // 100 = step1
            // 110 = step2
            // 111 = step3
        progess_bar() 
    
              }
                else if (this.status == 400) {  
                    alert("Some error occured!");
                }
                else{
                    alert("Check Network!");
                }
            }  

            xhr.open("POST", "http://"+IP+":8081/filled_tender_desc");
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.send(data);

function progess_bar() {
    // body...


    //progress bar code------------------------------------------------------
              
            var i = 0;
            if(status === "100"){
                move1()
                console.log('status')
            }
            else if(status === "110"){
                move2()     
                console.log('status')
            }
            else if(status === "111"){
                move3()
            }

            function move1() {
                console.log('move1 called')

                if (i == 0) {
                    i = 1;
                    var elem = document.getElementById("pBar");
                    document.getElementById("arr1").style.display = "";
                    var width = 10;
                    var id = setInterval(frame, 20);
              
                    function frame() {
                        if (width >= (100 / 3)) {
                            clearInterval(id);
                            i = 0;
                        } 
                        else {
                            width++;
                            elem.style.width = width + "%";
                        }   
                    }
                }
            }
              
            function move2() {
                console.log('move2 called')

                if (i == 0) {
                  i = 1;
                  var elem2 = document.getElementById("pBar2");
                  document.getElementById("arr2").style.display = "";
                  var width = 10;
                  var id = setInterval(frame, 20);
              
                  function frame() {
                    if (width >= (100 / 3)) {
                      clearInterval(id);
                      i = 0;
                    } else {
                      width++;
                      elem2.style.width = width + "%";
                    }
                  }
                }
              }
              
              
            function move3() {
              document.getElementById("arr3").style.display = "";
                if (i == 0) {
                  i = 1;
                  var elem = document.getElementById("pBar3");
                  
                  var width = 10;
                  var id = setInterval(frame, 20);
              
                  function frame() {
                    if (width >= (100 / 3)) {
                      clearInterval(id);
                      i = 0;
                    } else {
                      width++;
                      elem.style.width = width + "%";
                    }
                  }
                }
              }

        //progress bar code over-------------------------------------------------
} 
