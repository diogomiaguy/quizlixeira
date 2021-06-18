const questions = [{
        question: "selo1",
        correctOption: "optionF"
    },
    {
        question: "selo2",
        correctOption: "optionG"
    },
    {
        question: "selo3",
        correctOption: "optionC"
    },
    {
        question: "selo4",
        correctOption: "optionI"
    },
    {
        question: "selo5",
        correctOption: "optionE"
    },
    {
        question: "selo6",
        correctOption: "optionB"
    },
    {
        question: "selo7",
        correctOption: "optionD"
    },
    {
        question: "selo8",
        correctOption: "optionA"
    },
    {
        question: "selo9",
        correctOption: "optionJ"
    },
    {
        question: "selo10",
        correctOption: "optionH"
    }

];

document.getElementById("totalquestoes").innerHTML = questions.length;

let shuffledQuestions = []; //matriz vazia para conter as perguntas selecionadas aleatoriamente
var i = 0;

function handleQuestions() {
    //função para embaralhar e enviar perguntas para a matriz shuffledQuestions

    if (shuffledQuestions.length <= questions.length) {
        const random = questions[i];
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(questions[i++]);
        }
    }

}

let questionNumber = 1;
let playerScore = 0;
let wrongAttempt = 0;
let indexNumber = 0;

// função para exibir a próxima pergunta na matriz para dom
function NextQuestion(index) {
    
    handleQuestions();
    const currentQuestion = shuffledQuestions[index];
    document.getElementById("question-number").innerHTML = questionNumber;
    document.getElementById("player-score").innerHTML = playerScore;
    document.getElementById("display-question").innerHTML = `<img src="img/${currentQuestion.question}.png" alt="">`;
}

function checkForAnswer() {
    
    const currentQuestion = shuffledQuestions[indexNumber]; //Obtém a questão atual

    const currentQuestionAnswer = currentQuestion.correctOption; //obtém a resposta da pergunta atual
    const options = document.getElementsByName("option"); //obtém todos os elementos em dom com o nome de 'opção' (neste as entradas de rádio)
    let correctOption = null;

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correto da entrada de rádio com a resposta correta
            correctOption = option.labels[0].id;
        }
    });

    //verificar se uma entrada de rádio foi verificada ou se uma opção foi escolhida
  
    
    // verificaCheck();
    if (
        options[0].checked === false &&
        options[1].checked === false &&
        options[2].checked === false &&
        options[3].checked === false &&
        options[4].checked === false &&
        options[5].checked === false &&
        options[6].checked === false &&
        options[7].checked === false &&
        options[8].checked === false &&
        options[9].checked == false
    ) {
        document.getElementById("option-modal").style.display = "flex";
    }

    //verificar se o botão de opção marcado é o mesmo que resposta
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).classList.add("correct")
            playerScore++;
            indexNumber++;
            //definido para atrasar o número da pergunta até quando a próxima pergunta carregar
            setTimeout(() => {
                questionNumber++;
            }, 1000);
        } else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id;

            // document.getElementById(wrongLabelId).style.backgroundColor = "red";
            // document.getElementById(correctOption).style.backgroundColor = "green";
            document.getElementById(wrongLabelId).classList.add("incorrect")
            document.getElementById(correctOption).classList.add("correct")

            wrongAttempt++;
            indexNumber++;
            //definido para atrasar o número da pergunta até quando a próxima pergunta carregar
            setTimeout(() => {
                questionNumber++;
            }, 1000);
        }
    });
}

//chamado quando o próximo botão é chamado
function handleNextQuestion() {
    checkForAnswer();
    unCheckRadioButtons();
    //atrasa a exibição da próxima pergunta por um segundo
    setTimeout(() => {
        if (indexNumber <= questions.length - 1) {
            NextQuestion(indexNumber);
        } else {
            handleEndGame();
        }
        resetOptionBackground();
    }, 1000);
}

//define as opções de fundo de volta para nulo após exibir as cores certas / erradas
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        // document.getElementById(option.labels[0].id).style.backgroundColor = "";
        document.getElementById(option.labels[0].id).classList.remove("correct")
        document.getElementById(option.labels[0].id).classList.remove("incorrect")
    });
}

// desmarcando todos os botões de opção para a próxima pergunta (pode ser feito com map ou foreach loop também)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// função para quando todas as perguntas forem respondidas
function handleEndGame() {
    let remark = null;
    let remarkColor = null;

    const playerGrade = (playerScore / questions.length) * 100;


    // verificação de condição para observação do jogador e cor de observação
    if (playerGrade <= 30) {
        remark = "Porcentagem baixa, continue praticando.";
        remarkColor = "red";
    } else if (playerGrade >= 40 && playerGrade < 70) {
        remark = "Porcentagem média, você pode fazer melhor.";
        remarkColor = "orange";
    } else if (playerGrade >= 70) {
        remark = "Excelente, continue com o bom trabalho.";
        remarkColor = "green";
    }


    //dados para exibir no placar
    document.getElementById("remarks").innerHTML = remark;
    document.getElementById("remarks").style.color = remarkColor;
    document.getElementById("grade-percentage").innerHTML = playerGrade;
    document.getElementById("wrong-answers").innerHTML = wrongAttempt;
    document.getElementById("right-answers").innerHTML = playerScore;
    document.getElementById("score-modal").style.display = "flex";
}



var el = document.getElementById("closemodal");
if (el) {
    el.addEventListener("click", function () {
        window.location.reload()
        document.getElementById("score-modal").style.display = "none";
    });
}

//função para fechar modal de aviso
function closeOptionModal() {
    document.getElementById("option-modal").style.display = "none";
}


// function verificaCheck(){
//     var radios = document.getElementsByTagName('input');
//     var value;
//     for (var i = 0; i < radios.length; i++) {
//         if (radios[i].type === 'radio' && radios[i].checked) {
//             // get value, set checked flag or do whatever you need to
//             value = radios[i].value; 
//             return value;
                  
//         }
//         if(value == undefined) {
//             document.getElementById("option-modal").style.display = "flex";
//         }
//     }
// }