import countries from './countries.js';

// your code here

function startNewRound() {
    //remove the correct or wrong message
    document.querySelector(".correct")?.remove();
    document.querySelector(".wrong")?.remove();

    
    //when question = 10 , display a popup with the score and the fail and ask if the user wants to play again 
    if (document.querySelector(".question").innerHTML == 10) {
        let score = document.querySelector(".score").innerHTML;
        let fail = document.querySelector(".fail").innerHTML;
        let playAgain = confirm(`your score is ${score} and your fail is ${fail} , do you want to play again ?`);
        if (playAgain) {
            document.querySelector(".score").innerHTML = 0;
            document.querySelector(".question").innerHTML = 0;
            document.querySelector(".fail").innerHTML = 0;
            startNewRound();
        }
    }








    //save the code in a variable and also its position in the array

    let random = Math.floor(Math.random() * countries.length);
    let code = countries[random][0];
    let country = countries[random][1];
    document.querySelector(".flag").src = `/images/4x3/${code}.svg`;



    //change the buttons text to random countries names with the correct answer in one of them randomly , withut repeating

    let correct = Math.floor(Math.random() * 4);
    let buttons = document.querySelectorAll("button");
    buttons[correct].innerHTML = country;
    let used = [random];
    for (let i = 0; i < buttons.length; i++) {
        if (i != correct && !buttons[i].classList.contains("new-button")) {
            let random = Math.floor(Math.random() * countries.length);
            while (used.includes(random)) {
                random = Math.floor(Math.random() * countries.length);
            }
            used.push(random);
            buttons[i].innerHTML = countries[random][1];
        }
    }

    //add event listener to the buttons to check if the answer is correct or not

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            if (i == correct) {
                document.querySelector("body").innerHTML += `<p class="correct">correct</p>`;
                //score +1 and display it in the score div
                let score = document.querySelector(".score").innerHTML;
                score++;
                document.querySelector(".score").innerHTML = score;

                //question +1 and display it in the question div
                let question = document.querySelector(".question").innerHTML;
                question++;
                document.querySelector(".question").innerHTML = question;


                //wait 1 second and start a new round
                setTimeout(startNewRound, 1);


            } else {
                document.querySelector("body").innerHTML += `<p class="wrong">wrong</p>`;
                //question +1 and display it in the question div
                let question = document.querySelector(".question").innerHTML;
                question++;
                document.querySelector(".question").innerHTML = question;

                //fail +1 and display it in the fail div
                let fail = document.querySelector(".fail").innerHTML;
                fail++;
                document.querySelector(".fail").innerHTML = fail;

                //wait 1 second and start a new round
                setTimeout(startNewRound, 1);

            }
        })
    }
}
startNewRound();


