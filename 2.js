function startNewRound() {
    //when question = 10 , display an end card over the game that make background dark and display the score and a button to start a new game
    if (document.querySelector(".question").innerHTML == 10) {
        document.querySelector("body").innerHTML += `<div class="end-card">
        <h1>Game Over</h1>
        <p>your score is ${document.querySelector(".score").innerHTML}</p>
        <button onclick="location.reload()">New Game</button>
        </div>`;
    }

    

    //remove the correct or wrong message
    document.querySelector(".correct")?.remove();
    document.querySelector(".wrong")?.remove();



    //change the flag randomly from the images folder to random countries code
    let countries = [
        //code , country name
        ["ac", "Ascension Island"],
        ["ad", "Andorra"],
        ["ae", "United Arab Emirates"],
        ["af", "Afghanistan"],
        ["ag", "Antigua and Barbuda"],
        ["ai", "Anguilla"],
        ["al", "Albania"],
        ["am", "Armenia"],
        ["ao", "Angola"],
        ["aq", "Antarctica"],
        ["ar", "Argentina"]
    ]
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
        if (i != correct) {
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
                //wait 1 second and start a new round
                setTimeout(startNewRound, 1);

            }
        })
    }
}
startNewRound();


