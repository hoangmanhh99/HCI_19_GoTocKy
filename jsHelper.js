function checkKey(e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        if (e.keyCode != 89 && e.keyCode != 72 && e.keyCode != 66 && e.keyCode != 90 && e.keyCode != 88) {
            return true;
        }
        return false;
    }
    return false;
}

let key = [];
let time = 60000;
let timeCount;
let a = 0;
let wordCount = 0;
let word = "";
let resetWord = false;
let correctWordCount = 0;
let keypress = [];
let callFuncCount = 0;
//Nút reset
function reset() {
    $('#myModal').modal("show");
}



//On key down
function onKeyDown(e) {
    if (resetWord) {
        keypress.forEach(x => {
            document.getElementById("key" + x).style.backgroundColor = "black";
            document.getElementById("key-steno-" + x).style.backgroundColor = "black";
        })
        //Reset các biến
        callFuncCount = 0;
        keypress = [];
        resetWord = false;
    }
    if (checkKey(e)) {
        keypress.push(e.key);
    }
}
//Typing (onkeyup)
function typing(e) {
    if (e.code === "Space") {
        a = a + 1;

        
        //Xử lí tô màu chữ
        wordCount = wordCount + 1;
        let beforeWord = document.querySelector(`span[word = '${wordCount - 1}']`);
        let currentWord = document.querySelector(`span[word = '${wordCount}']`);
        currentWord.style.background = "rgb(221, 221, 221)";
        beforeWord.style.background = "";

        //Xử lí đếm giờ
        if (a === 1) {
            var x = setInterval(() => {
                time = time - 1000;
                if (time < 1000) {
                    $('#myModal').modal("show");
                    time = 0;
                    clearInterval(x)
                }
                document.querySelector("#time-count").innerHTML = millisToMinutesAndSeconds(time);
            }, 1000)
        }


        //Xử lí fake kết quả
        let wordPressedResult, wordCorrectResult;


        let variable1 = Math.floor(Math.random() * 100);
        let variable2 = Math.floor(Math.random() * 100);
        let variable3 = Math.floor(Math.random() * 200) + 200;
        if (variable1 > variable2) {
            wordPressedResult = variable1;
            wordCorrectResult = variable2;
        } else {
            wordPressedResult = variable2;
            wordCorrectResult = variable1;
        }
        let wordWrongResult = wordPressedResult - wordCorrectResult;
        let percentCorrectWord = wordCorrectResult === 0 ? 0 : (wordCorrectResult / wordPressedResult).toFixed(1) * 100;
        document.getElementById("word-pressed-result").innerHTML = wordPressedResult;
        document.getElementById("word-correct-result").innerHTML = wordCorrectResult;
        document.getElementById("word-wrong-result").innerHTML = wordWrongResult;
        document.getElementById("ratio-word-result").innerHTML = percentCorrectWord + "%";
        document.getElementById("wpm").innerHTML = variable3 + " WPM";
    } else if (checkKey(e)) {
        let keystenopress = "";

        callFuncCount += 1;
        keypress.forEach(x => {
            document.getElementById("key" + x).style.backgroundColor = "red";
            document.getElementById("key-steno-" + x).style.backgroundColor = "red";
            keystenopress += document.getElementById("key-steno-" + x).innerText;
        })

        resetWord = true;
        if (callFuncCount === 1) {
            //Xử lí các từ đã gõ
            let now = new Date();
            let time1 = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()

            document.getElementById("key-pressed").innerText += time1 + ":             " + keystenopress + "\n";
            // document.querySelector("#typing").value = ""
        }
    }
}

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}





