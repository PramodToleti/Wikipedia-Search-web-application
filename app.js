let searchInputEl = document.getElementById('searchInput');
let searchResultsEl = document.getElementById('searchResults');
let spinner = document.getElementById('spinner');
let searchIconEl = document.getElementById("searchIcon");

function createAndAppendResult(result) {
    let {
        title,
        link,
        description
    } = result;
    //creating Result item (div)
    let resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    searchResultsEl.appendChild(resultItem);

    //creating Title element (a)
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.href = title;
    resultTitleEl.target = "_blank";
    resultItem.appendChild(resultTitleEl);

    //creating Break Element (br)
    let titleBreakEl = document.createElement("br");
    resultItem.appendChild(titleBreakEl);

    //creating URL element (a)
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.textContent = link;
    urlEl.href = link;
    urlEl.target = "_blank";
    resultItem.appendChild(urlEl);

    //creating Break Element (br)
    let lineBreakEl = document.createElement("br");
    resultItem.appendChild(lineBreakEl);

    //creating Description Element (p)
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItem.appendChild(descriptionEl);
}

function displayResults(searchResults) {
    spinner.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchIconEl.remove();
        searchResultsEl.textContent = "";
        spinner.classList.toggle("d-none");
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET",
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsondata) {
                let {
                    search_results
                } = jsondata;
                displayResults(search_results);

            });

    }
}

searchInputEl.addEventListener('keydown', searchWikipedia);