const cacheKey1 = "profileStat";
const cacheKey2 = "titleHistory";

let booksCount

function checkStorage() {
    return typeof (Storage) !== "undefined"
}

function recordHistory(data, key) {
    if (checkStorage()) {
        let historyData = null;
        if (sessionStorage.getItem(key) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(sessionStorage.getItem(key));
        }
        // console.log(historyData);
        // console.log(data);

        if (key === cacheKey2) {
            let index = null;
            let item = null;
            for (item of historyData) {
                if (item.title === data.title) {
                    index = historyData.indexOf(item);
                    if (index > -1) {
                        historyData.splice(index, 1);
                    }
                }
            }
            historyData.unshift(data);
            booksCount = historyData.length;
            console.log(booksCount);
        } else if (key === cacheKey1) {
            historyData.pop();
            historyData.unshift(data);
        }
        sessionStorage.setItem(key, JSON.stringify(historyData));
    } else {
        alert(`your browser software doesn't support sessionStorage API`)
    }
}

function getHistory(key) {
    if (checkStorage()) {
        return JSON.parse(sessionStorage.getItem(key)) || [];
    } else {
        return [];
    }
}

function renderingData() {
    const historyData = getHistory(cacheKey2);
    const statData = getHistory(cacheKey1);
    console.log(statData);
    let recentList = document.getElementById('recentList');
    // console.log(recentList);
    recentList.innerHTML = '';
    const collection = document.getElementById('pCollection');
    const booksReaded = document.getElementById('pReaded');
    const rank = document.getElementById('pRank');

    // render data recent list dari storage
    for (const item of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${historyData.indexOf(item)+1}</td>
            <td class="title">${item.title}</td>
            <td>${item.timestamp}</td>`;
        recentList.appendChild(row);
    }
    // render data stat (rank, collection, readed)
    for (const item of statData) {
        rank.innerText = item.rank;
        collection.innerText = item.collection;
        booksReaded.innerText = item.booksReaded;
    }

    const buttonElement = document.getElementById('submitBtn')
    const bookTitle = document.getElementById('bookTitle')
    const bookAuthor = document.getElementById('bookAuthor')
    const bookPublish = document.getElementById('bookPublish')
    const bookDesc = document.getElementById('bookDesc')
    let container = document.querySelector('.flex-Y-container');
    console.log(container)

    buttonElement.addEventListener('click', function (event) {
        let Eflag = false;
        const bookData = {
            title: bookTitle.value,
            author: bookAuthor.value,
            published: bookPublish.value,
            description: bookDesc.value
        };
        for (const prop in bookData) {
            if ((bookData[prop] === null) || (bookData[prop] === '')) {
                alert(`${prop} field is empty!`);
                Eflag = true;
                break;
            }
        }
        if (!Eflag) {
            let newCollection = document.createElement('div');
            newCollection.classList.add('flex-X-container');
            newCollection.innerHTML = `
                    <div class="contentImg">
                        <img src="./resources/book vector.png" alt="${bookData.title}">
                    </div>
                    <div class="contentDetail">
                        <h3 class="title">${bookData.title}</h3>
                    <table >
                        <tr>
                            <td>Author</td>
                            <td class="author">${bookData.author}</td>
                        </tr>
                        <tr>
                            <td>Published</td>
                            <td>${bookData.published}</td>
                        </tr>
                    </table>
                    <p>Description</p>
                    <p>${bookData.description}</p>
                    </div>`;
            console.log(bookData);
            container.appendChild(newCollection);
        }
    })

    clickTitle = document.querySelectorAll('.title')
}

renderingData();