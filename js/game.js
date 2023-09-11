const decodeLevelOne =
{
    A: { A: '8', D: 'p', F: '3', G: 'd', V: '1', X: 'n' },
    D: { A: 'l', D: 't', F: '4', G: 'o', V: 'a', X: 'h' },
    F: { A: '7', D: 'k', F: 'b', G: 'c', V: '5', X: 'z' },
    G: { A: 'j', D: 'u', F: '6', G: 'w', V: 'g', X: 'm' },
    V: { A: 'x', D: 's', F: 'v', G: 'i', V: 'r', X: '2' },
    X: { A: '9', D: 'e', F: 'y', G: '0', V: 'f', X: 'q' }
}; //level one rule
const decodeLevelThree = "abcdefghijklmnopqrstuvwxyz"; //level three

var levelOneWords = ["apple", "life", "tree", "20840", "12345", "green", "yellow", "german", "france", "italy"];
var levelTwoWords = ["stars", "earth", "beauty", "flower", "ocean", "forest", "mountain", "element", "country", "city"];
var levelThreeWords = ["purple", "rocket", "wisdom", "jungle", "impact", "marvel", "safari", "spirit", "gadget", "canyon"];
var levelFourWords = ["exploringbeneaththesea", "racingthroughthestorm", "chasingthefadinglight", "dancingunderthemoonlight", "soaringabovetheclouds", "whisperingthroughthewind", "buildingcastlesinthesky", "leapingovertheobstacles", "discoveringhiddenpaths", "laughinginthepouringrain"];
var levelFourKeys = ["mars", "venus", "saturn"];

const length = levelOneWords.length; //10 items for all levels
const shiftLevel = 2; //for level three

var wordLength; //random question's word length
var getAns;
var toClear;
var life; //to assign div element life
var heart = 5;
var count = 100;
var currentLevel = 1; //current game level
var encodedLevelOne = []; //encoded level one words
var randomLevelOne = []; //index of random level one
var randomLevelTwo = []; //index of random level two
var randomLevelThree = []; //index of random level three
var randomLevelFour = []; //index of random level four
var levelFourQues = []; //randomised level four ques
var finalLvlFourAns = []; //levelFourAnswers
var correctValues = [0, 0, 0]; //correct value array

var answers = document.getElementsByClassName("ans");
var questions = document.getElementsByClassName("ques");
var keys = document.getElementsByClassName("key");
var result = document.getElementsByClassName("result");
var time = document.getElementById("time");
var timeResult = document.getElementById("timeResult");
var start = document.getElementById("start");
var nextBtn = document.getElementById("btn"); //next Level button
var greeting = document.getElementById("playerName");
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

//data carry
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var gameLife = urlParams.get("heart");
var isCurrent = urlParams.get("current");
var username = urlParams.get("username");
greeting.innerText = username;

(gameLife != null) ? heart = Number(gameLife) : "";
(isCurrent != null && Number(isCurrent) != currentLevel) ? currentLevel = Number(isCurrent) : "";
if (currentLevel == 4) {
    count = 300;
} else if (currentLevel == 3) {
    count = 150;
}

const dynamicText = document.querySelector(".dynamic-text");
// Select the element with the class "dynamic-container"
const dynamicContainer = document.querySelector('#dynamic');

const textLoad = () => {
    setTimeout(() => {
        dynamicText.textContent = `Hello ${username}, I'm Robot`;
        const robotImage = document.createElement("img");
        robotImage.src = "./images/GameOne/robot.png"; // Replace with the path to your image
        robotImage.style.height = "35px";
        dynamicText.appendChild(robotImage);
    }, 0);
    setTimeout(() => {
        dynamicText.textContent = `I'll explain Game rule`;
    }, 4000);
    setTimeout(() => {
        dynamicText.textContent = `If you don't know how to translate,`;
    }, 8000);
    setTimeout(() => {
        dynamicText.textContent = `You can get help from me`;
    }, 12000);
    setTimeout(() => {
        dynamicText.textContent = `You have few mins to translate the alien's language.`;
    }, 16000);
    setTimeout(() => {
        dynamicText.textContent = `For the whole game, you have 5 chance to mistake.`;
    }, 20000);
    setTimeout(() => {
        dynamicText.textContent = `Otherwise, you will be killed by aliens`;
    }, 24000);
};

if (dynamicText != null) {
    textLoad();
    setInterval(textLoad, 84000);
}
if (dynamicContainer != null) {
    // Wait for 13 seconds before removing the element
    setTimeout(() => {
        dynamicContainer.remove();
    }, 28000);
}

btn.onclick = () => { modal.style.display = "block"; }
span.onclick = () => { modal.style.display = "none"; }

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// End Description

encodeLevelOne(); //encode all level one Words
//before click start button-> heart state
setHeart(heart);

function boxStyles() {
    for (let index = 0; index < answers.length; index++) {
        questions[index].style.backgroundColor = "#2c2c54";
        answers[index].style.backgroundColor = "#2c2c54";
        answers[index].disabled = true;
    }
}

/*
    this function is for encoding question 
    result is encodeLevelOne Array will include all encoded level one words
*/
function encodeLevelOne() {
    levelOneWords.forEach((item) => {
        const ques = item.split(""); //[a, p, p, l, e]
        var encode = stringEncode(ques);
        encodedLevelOne.push(encode);
    });
}

/*
    this function is for encoding level one words' string
    strObj is a string from encodeLevelOne function
    this function returns the encoded string
*/
function stringEncode(strObj) {
    var encode = "";
    strObj.forEach(element => {
        for (const key in decodeLevelOne) {
            let val = decodeLevelOne[key];
            for (const num in val) {
                if (element == val[num]) {
                    encode += key + num + " ";
                }
            }
        }
    });
    return encode;
}

/*
    this function is for getting random indices
    levelArray is to put the random indices according to each level
*/
function randomFunc(levelArray) {
    for (let index = 0; index < 3; index++) {
        var rand = Math.floor(Math.random() * length);
        while (levelArray.includes(rand)) {
            rand = Math.floor(Math.random() * length);
        }
        levelArray.push(rand);
    }
}

//this is for putting question onto the page
//level one put ques
function putQuesLevelOne() {
    randomLevelOne = [];
    randomFunc(randomLevelOne);
    randomLevelOne.forEach((item, index) => {
        questions[index].innerText = encodedLevelOne[item];
    });
}

//level two put ques
function putQuesLevelTwo() {
    randomLevelTwo = [];
    randomFunc(randomLevelTwo);
    randomLevelTwo.forEach((item, index) => {
        var string = levelTwoWords[item].split("");
        string.forEach(item1 => {
            questions[index].innerHTML += `<img src="./pigpen codes/${item1}.png" width="30px"/>`;
        });
    });
}

//level three put ques
function putQuesLevelThree() {
    randomLevelThree = [];
    randomFunc(randomLevelThree);
    randomLevelThree.forEach((item, index) => {
        var string = levelThreeWords[item].split(""); //[a, p, p, l, e]
        const encodedString = string.map(element => {
            const index = decodeLevelThree.indexOf(element);
            if (index !== -1) {
                var encodedIndex = index + shiftLevel + 1;
                //for x, y, z
                (encodedIndex >= 26) ? encodedIndex -= decodeLevelThree.length : "";
                return decodeLevelThree[encodedIndex]; //a -> d(each encoded character)
            }
        }).join('');
        //console.log(`answer is ${levelThreeWords[item]}`);
        questions[index].innerHTML += encodedString;
    });
}

//level four put ques
function putQuesLevelFour() {
    randomLevelFour = [];
    randomFunc(randomLevelFour);
    /*
        this function returns array of 3 random levelFourWords
        and assign into levelFourQues array
    */
    levelFourQues = randomLevelFour.map((element, index) => {
        //console.log(`answer is ${levelFourWords[element]}`);
        keys[index].innerHTML += levelFourKeys[index];
        questions[index].innerHTML += levelFourWords[element];
        return levelFourWords[element];
    }); //3 random questions 
    encodeLevelFour();
}

start.addEventListener("click", () => {
    start.disabled = true;
    document.getElementById("heart").innerHTML = "";
    for (let index = 0; index < answers.length; index++) {
        answers[index].disabled = false;
        answers[index].style.backgroundColor = "black";
        questions[index].style.backgroundColor = "black";
    }
    setHeart(heart);
    timeResult.innerText = "";
    if (currentLevel == 1) {
        putQuesLevelOne();
    } else if (currentLevel == 2) {
        putQuesLevelTwo();
    } else if (currentLevel == 3) {
        putQuesLevelThree();
    } else if (currentLevel == 4) {
        putQuesLevelFour();
    }
    toClear = setInterval(countdown, 1000);
});

function setHeart(totalHeart) {
    //heart
    for (let index = 0; index < totalHeart; index++) {
        document.getElementById("heart").innerHTML += `<ion-icon name="heart" class="life"></ion-icon>`;
    }
    life = document.getElementsByClassName("life");
}

function countdown() {
    if (count > -1) {
        time.innerText = count-- + " s";
    }
    if (count == -1) {
        clearInterval(toClear);
        start.disabled = false;
        boxStyles();
        timeResult.innerText = "Your Time is Over!";
        if (correctValues.includes(0)) { //even if one answer is wrong
            resetAll();
            heart--;
        }
        if (heart == 0) {
            document.body.innerHTML = `
                <button id="restart">
                    Restart
                </button>            
                <div class="bloodContainer">
                    <div class="bloodBox">
                        <h2 id="gameOver"  class="note"></h2>
                        <section>
                            <div class='blooddrop'></div>
                            <div class='blooddrop'></div>
                            <div class='blooddrop'></div>
                            <div class='blooddrop'></div>
                            <div class='blooddrop'></div>
                            <div class='blooddrop'></div>
                            <div class='blooddrop'></div>
                            <div class='blooddrop'></div>
                            <div class='blooddrop'></div>
                            <div class='blooddrop'></div>
                            <div class='blooddrop'></div>
                            <div class='blooddrop'></div>
                            <div class='blooddrop'></div>
                            <div class='blooddrop'></div>
                            <div class='blooddrop'></div>
                            <div class='blooddrop'></div>
                            <div class='blooddrop'></div>
                            <div class='blooddrop'></div>
                            <div class='blooddrop'></div>
                            <div class='blooddrop'></div>
                            <div class='blooddrop'></div>
                            <div class='blooddrop'></div>
                        </section>
                    </div>
                </div>
                <audio id="overSound" src="./audio/gameOver.mp3"></audio>
                `;
            document.getElementById("restart").addEventListener("click", () => {
                window.location.reload(); //restart game
                window.location.href = `./login.html`;
            });
            document.getElementById("gameOver").innerHTML = "You were killed by Alien";
            document.getElementById("overSound").play();
        } else {
            life[heart].style.color = "black";
        }
    }
}

//slice the level four question
//e.g - whisperthewordtoanother
//e.g - for mars(key) -> [whis], [pert], etc.
function sliceEachWords(index, slicedWords) {
    var sliceLength = levelFourKeys[index].length;
    var quesLength = levelFourQues[index].length;
    var startIndex = 0;
    var endIndex = startIndex + sliceLength; //mars -> 4, venus -> 5, saturn -> 6
    var leftWords;

    while (endIndex <= quesLength) {
        var sliced = levelFourQues[index].slice(startIndex, endIndex); //[whis] -> ['w', 'h', 'i', 's']
        slicedWords.push(sliced);
        startIndex += sliceLength;
        endIndex = startIndex + sliceLength;
        leftWords = quesLength % sliceLength;
    }
    if (leftWords != 0) {
        endIndex = quesLength;
        var sliced = levelFourQues[index].slice(startIndex, endIndex);
        slicedWords.push(sliced);
    }
}

/* this function results : finalLvlFourAns will contain level four answers */
function encodeLevelFour() {
    for (let index = 0; index < levelFourKeys.length; index++) {
        var slicedWords = []; //[whis], [pert],....
        sliceEachWords(index, slicedWords);

        //splice keys
        var keysSplice = levelFourKeys[index].split(""); //['m', 'a', 'r', 's']

        //make spliced keys obj
        const keysObj = {};
        keysSplice.forEach(element => { keysObj[element] = ""; }); //{m: "", a: "", r: "", s:""}

        /*
            assign each sliced words first index to each key column
            if there is keys left but no words left isUndefined will become true
            else if there is keys assign the char to the obj[keySplice's item]
            e.g output: {m: "d", a: "i", r: "s", s: "c"}
        */
        var splitString;
        slicedWords.forEach((item) => {
            splitString = item.split(""); //here sliced words -> [ 'd', 'i', 's', 'c' ],....etc.
            keysSplice.forEach((char, index1) => { //m a r s
                var isUndefined = (splitString[index1] == undefined) ? true : false;
                (!isUndefined) ? keysObj[char] += splitString[index1] : "";
            });
        });

        //sort the keys alphabetically
        const keys = Object.keys(keysObj);
        keys.sort();

        //after sorted, join all the values into string
        var tempSorted = "";
        for (const key of keys) {
            tempSorted += keysObj[key];
        }
        finalLvlFourAns.push(tempSorted);
        //console.log(finalLvlFourAns);
    }
}

for (let index = 0; index < answers.length; index++) {
    answers[index].addEventListener("input", () => {
        if (currentLevel == 1) {
            checkAnswer(index, levelOneWords, randomLevelOne);
        } else if (currentLevel == 2) {
            checkAnswer(index, levelTwoWords, randomLevelTwo);
        } else if (currentLevel == 3) {
            checkAnswer(index, levelThreeWords, randomLevelThree);
        } else if (currentLevel == 4) {
            checkAnswer(index, finalLvlFourAns, randomLevelFour);
        }
    });
}

/*
    index -> index from class answers[index]
    levelArray -> levelOneWords, levelTwoWords, etc. accordingly
    levelRandomArray -> randomLevelOne, randomLevelTwo, etc.
    this function is to check answer from user input
    if correct show green circle and check game win
    if wrong show red circle
*/
function checkAnswer(index, levelArray, levelRandomArray) {
    getAns = answers[index].value; //user input answer
    wordLength = (currentLevel == 4) ? levelArray[index].length : levelArray[levelRandomArray[index]].length;
    if (getAns.length == wordLength) {
        let realAns = (currentLevel == 4) ? levelArray[index] : levelArray[levelRandomArray[index]];
        wordCheck(index, getAns, realAns);
    } else {
        correctValues[index] = 0; // 0 is wrong value
        result[index].style.backgroundColor = 'red';
    }
}

function wordCheck(index, getAns, realAns) {
    if (getAns == realAns) {
        result[index].style.backgroundColor = 'green';
        document.getElementById("correct").play();
        correctValues[index] = 1; //1 is correct value
        checkGameLevelWin();
    }
}

function checkGameLevelWin() {
    //win state
    if (!correctValues.includes(0)) {
        clearInterval(toClear);
        setTimeout(() => {
            boxStyles();
        }, 1000);
        var btnText = (currentLevel == 4) ? "Next" : "Next Level";
        nextBtn.innerHTML += `<button id="next">${btnText}</button>`;
        (currentLevel == 3) ? document.getElementById("warning").innerHTML += `⚠️ Next Level Is Extremely Challenging!⚠️  Good Luck!🫰` : "";
        document.getElementById("next").onclick = () => {
            currentLevel += 1; //use for putQues
            window.location.href = `./game${currentLevel}.html?heart=${encodeURIComponent(heart)}&current=${encodeURIComponent(currentLevel)}&username=${encodeURIComponent(username)} `;
        };
    }
}

function resetAll() {
    clearInterval(toClear);
    correctValues = [0, 0, 0];
    if (currentLevel == 4) {
        count = 300;
    } else if (currentLevel == 3) {
        count = 150;
    } else{
        count = 100;
    }
    setTimeout(() => {
        for (let index = 0; index < answers.length; index++) {
            questions[index].innerText = "";
            answers[index].value = "";
            (currentLevel == 4) ? keys[index].innerText = "" : "";
            result[index].innerText = "";
            time.innerText = "";
            result[index].style.backgroundColor = '#2c2c54';
        }
    }, 0);
}

window.addEventListener('load', () => {
    setTimeout(() => {
        var audio = document.getElementById('audio');
        audio.play();
    }, 1500);
});

setTimeout(() => {
    var gameOne = document.querySelector(".gameStartOne");
    (gameOne != null) ? gameOne.style.display = 'block' : "";
}, 38000);

setTimeout(() => {
    var gameTwo = document.querySelector(".gameStartTwo");
    (gameTwo != null) ? gameTwo.style.display = 'block' : "";
}, 9000);

setTimeout(() => {
    var gameThree = document.querySelector(".gameStartThree");
    (gameThree != null) ? gameThree.style.display = 'block' : "";
}, 9000);