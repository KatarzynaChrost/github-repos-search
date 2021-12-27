const form = document.querySelector('#search-form')
const resultContainer = document.querySelector('.result');
const resultList = document.querySelector('.result-list')

if(form && resultContainer && resultList){
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const userName = (<HTMLInputElement>document.querySelector('.search')).value.replace(' ', '')

        fetch(`https://api.github.com/users/${userName}/repos?per_page=100`)
            .then(res => res.json())
            .then(data => {
                const resultUserName = <HTMLHeadingElement>document.querySelector('#result-username')
                if(resultUserName){
                    let message = ""
                    if (data.message) {
                        message = "There is no such a user, try again"
                            resultList.innerHTML = ''
                    }
                    else if (!data.length) {
                        message = `${userName} has no repositories`
                            resultList.innerHTML = ''
                    }
                    else{
                        message = `${userName}'s repositories:`;
                        if(resultList){
                            resultList.innerHTML = data
                                .sort((r1, r2) => r2.stargazers_count - r1.stargazers_count)
                                .reduce((total, { name, stargazers_count }) =>
                                    `${total}
                                    <li class="result-repos">
                                        <p>${name}</p>
                                        <p>Stars: ${stargazers_count}</p>
                                    </li>`
                                    , '')
                        }
                    }
                    resultUserName.innerText = message;
                    resultContainer.classList.add("-visible")
                }
            })
    })
}