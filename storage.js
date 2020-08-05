const cacheKey1 = "profileStat";
const cacheKey2 = "titleHistory";
const cacheKey3 = "collectionHistory"

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
            console.log(booksCount);
        } else if (key === cacheKey1) {
            historyData.pop();
            historyData.unshift(data);
        } else if (key === cacheKey3) {
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

function removeElementsByClass(className) {
    let elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function renderingData() {
    const historyData = getHistory(cacheKey2);
    const statData = getHistory(cacheKey1);
    const collectionData = getHistory(cacheKey3);
    console.log(statData);
    let recentList = document.getElementById('recentList');
    recentList.innerHTML = '';

    // render data recent list dari storage
    for (const item of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${historyData.indexOf(item)+1}</td>
        <td class="title">${item.title}</td>
        <td>${item.timestamp}</td>`;
        recentList.appendChild(row);
    }

    const collection = document.getElementById('pCollection');
    const booksReaded = document.getElementById('pReaded');
    const rank = document.getElementById('pRank');

    // render data stat (rank, collection, readed)
    for (const item of statData) {
        rank.innerText = item.rank;
        collection.innerText = item.collection;
        booksReaded.innerText = item.booksReaded;
    }

    let container = document.querySelector('.flex-Y-container');
    removeElementsByClass('newData')

    // render data collection
    console.log(container)
    for (const item of collectionData) {
        let newCollection = document.createElement('div');
        newCollection.classList.add('flex-X-container');
        newCollection.classList.add('newData');
        newCollection.innerHTML = `
            <div class="contentImg">
                <img src="./resources/book vector.png" alt="${item.title}">
            </div>
            <div class="contentDetail">
                <h3 class="title">${item.title}</h3>
            <table >
                <tr>
                    <td>Author</td>
                    <td class="author">${item.author}</td>
                </tr>
                <tr>
                    <td>Published</td>
                    <td>${item.published}</td>
                </tr>
            </table>
            <p>Description</p>
            <p>${item.description}</p>
            </div>`;
        console.log(item);
        container.appendChild(newCollection);
    }
    clickImg = document.querySelectorAll('.contentImg');
    clickTitle = document.querySelectorAll('.title');
}

renderingData();