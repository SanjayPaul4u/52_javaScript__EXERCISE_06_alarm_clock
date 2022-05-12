console.log("Exercise 6: creating alarm clock");
showSetAlarmTime();

// Initialize Hours input and Minute input
let hoursInput = document.getElementById("hoursInput");
let minuteInput = document.getElementById("minuteInput");

//Save values in LOCAL STORAGE FROM INPUT
function saveData() {
    let value = localStorage.getItem("values");
    let myArray;
    if (value == null) {
        myArray = [];
    }
    else {
        myArray = JSON.parse(value);
    }

    let myObj = {
        hours: hoursInput.value,
        minute: minuteInput.value
    }

    myArray.push(myObj);
    localStorage.setItem("values", JSON.stringify(myArray));

    hoursInput.value = "";
    minuteInput.value = "";
}

let audio = new Audio('./52_hold On Audio.mp3');



//showing set time on display
function showSetAlarmTime() {
    let value = localStorage.getItem("values");
    let myArray;
    if (value == null) {
        myArray = [];
    }
    else {
        myArray = JSON.parse(value);
    }

    let html = ""
    myArray.forEach((element, index) => {
        html += `<div class="time">
                    <h3>${element.hours}:${element.minute}</h3>
                    <button id=${index} onclick = "deleteAlarm(this.id)">Delete</button>
                </div>
                <hr>`
    })

    let subContainer = document.getElementById("subContainer");
    subContainer.innerHTML = html;
}

function deleteAlarm(index) {
    // console.log(index, "i am deleted");
    let value = localStorage.getItem("values");
    let myArray;
    if (value == null) {
        myArray = [];
    }
    else {
        myArray = JSON.parse(value);
    }
    myArray.splice(index, 1);
    localStorage.setItem("values", JSON.stringify(myArray));
    showSetAlarmTime();
}

//One iterators
function myIterator(Array) {
    let nextIndex = 0;
    return {
        next: function () {
            if (nextIndex < Array.length) {
                return {
                    value: Array[nextIndex++],
                    done: false
                }
            }
            else {
                return {

                    done: true
                }
            }
        }
    }
}



//Main work with Button...
let btn = document.getElementById("btn");
btn.addEventListener("click", () => {

    saveData();
    showSetAlarmTime();

    let value = localStorage.getItem("values");
    let myArray;
    if (value == null) {
        myArray = [];
    }
    else {
        myArray = JSON.parse(value);
    }
    let times = myIterator(myArray);


    myArray.forEach(()=>{
        let allTime = times.next().value;
        let h =Number(allTime.hours);
        let m = Number(allTime.minute);

        console.log(h);
        console.log(m);

        setInterval(() => {
            let date = new Date();
                let hours = date.getHours();
                let minute = date.getMinutes();
                let second = date.getSeconds();
        
            if (hours === h && minute === m && second === 1) {
                console.log("Alarm time is matching...");
                audio.play();
        
            }
        }, 1000);
    })
})

let stopBtn = document.getElementById("stopBtn");
stopBtn.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
})