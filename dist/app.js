var form = document.querySelector('#search-form');
var resultContainer = document.querySelector('.result');
var resultList = document.querySelector('.result-list');
if (form && resultContainer && resultList) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var userName = document.querySelector('.search').value.replace(' ', '');
        fetch("https://api.github.com/users/".concat(userName, "/repos?per_page=100"))
            .then(function (res) { return res.json(); })
            .then(function (data) {
            var resultUserName = document.querySelector('#result-username');
            if (resultUserName) {
                var message = "";
                if (data.message) {
                    message = "There is no such a user, try again";
                    resultList.innerHTML = '';
                }
                else if (!data.length) {
                    message = "".concat(userName, " has no repositories");
                    resultList.innerHTML = '';
                }
                else {
                    message = "".concat(userName, "'s repositories:");
                    if (resultList) {
                        resultList.innerHTML = data
                            .sort(function (r1, r2) { return r2.stargazers_count - r1.stargazers_count; })
                            .reduce(function (total, _a) {
                            var name = _a.name, stargazers_count = _a.stargazers_count;
                            return "".concat(total, "\n                                    <li class=\"result-repos\">\n                                        <p>").concat(name, "</p>\n                                        <p>Stars: ").concat(stargazers_count, "</p>\n                                    </li>");
                        }, '');
                    }
                }
                resultUserName.innerText = message;
                resultContainer.classList.add("-visible");
            }
        });
    });
}
