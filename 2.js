import { countries } from "./countries.js";

let score = 0;
let question = 0;


function startNewRound() {
    //when question = 10 , display the score and the total number of questions, and a button to start a new game , reset the score and the question number and refresh the page
    if (question === 10) {
        document.querySelector("body").innerHTML = `<div class="endPage">score : ${score}<button onclick="location.reload()">start a new game</button></div>`;
    }

    //remove the correct or wrong message
    document.querySelector(".correct")?.remove();
    document.querySelector(".wrong")?.remove();

    // Select random country from the array
    let random = Math.floor(Math.random() * countries.length);
    let code = countries[random][0];
    let country = countries[random][1];
    document.querySelector(".flag").src = `/images/4x3/${code}.svg`;

    // Set text for buttons and select one as the correct answer
    let correct = Math.floor(Math.random() * 4);
    let buttons = document.querySelectorAll("button");
    buttons[correct].innerHTML = country;
    let used = [random];
    for (let i = 0; i < buttons.length; i++) {
        if (i != correct) {
            let random = Math.floor(Math.random() * countries.length);
            while (used.includes(random)) {
                random = Math.floor(Math.random() * countries.length);
            }
            used.push(random);
            buttons[i].innerHTML = countries[random][1];
        }
    }

    // Add event listener to check if the answer is correct
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function() {
            if (i == correct) {
                document.querySelector("body").innerHTML += `<p class="correct">correct</p>`;
                //increment score and question
                score++;
                question++;
                setTimeout(startNewRound, 1);
            } else {
                document.querySelector("body").innerHTML += `<p class="wrong">wrong</p>`;
                //increment question
                question++;
                setTimeout(startNewRound, 1);
            }
        });
    }
}
startNewRound();
