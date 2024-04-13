function showResults(results) {
    const poolAnswers = document.querySelector('.poll__answers')
    poolAnswers.innerHTML = ''
    allVotes = 0
    results.forEach((result) => {
        allVotes += Number(result["votes"])
    })
    console.log(allVotes)
    const onePercent = allVotes / 100
    for (result of results) {
        // console.log(result)
        const answerVotes = document.createElement('div')
        answerVotes.innerText = result["answer"] + ': ' + result["votes"] + ' голосов (' + (Number(result['votes']) / onePercent).toFixed(2) + '%)'
        poolAnswers.appendChild(answerVotes)
    }

}

function buttonClickHandler() {
    alert('Спасибо, ваш голос засчитан!')
    const xhrBtn = new XMLHttpRequest;
    const vote = Number(this.dataset["vote"])
    const answer = Number(this.dataset["answer"]) + 1
    // console.log(this.dataset["vote"], this.dataset["answer"])
    xhrBtn.addEventListener('readystatechange', () => {
        if (xhrBtn.readyState == xhr.DONE) {
            // console.log(JSON.parse(xhrBtn.responseText).stat)
            showResults(JSON.parse(xhrBtn.responseText).stat)
        }
    })
    xhrBtn.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
    xhrBtn.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhrBtn.send('vote=' + vote + '&answer=' + answer);
}

function poolAdd(vodeID, title, answers) {
    const poolTitle = document.querySelector('.poll__title')
    poolTitle.innerText = title
    const poolAnswers = document.querySelector('.poll__answers')
    for (let i in answers) {
        button = document.createElement('button')
        button.classList.add('poll__answer')
        button.textContent = answers[i]
        button.dataset["vote"] = vodeID
        button.dataset["answer"] = i
        poolAnswers.appendChild(button)
        button.addEventListener('click', buttonClickHandler)
    }

}

const xhr = new XMLHttpRequest()
xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState == xhr.DONE) {
        data = JSON.parse(xhr.responseText);
        poolAdd(data["id"], data.data["title"], data.data["answers"])
    }
})

xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll', true)
xhr.send()