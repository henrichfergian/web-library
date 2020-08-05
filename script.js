let clickImg = document.querySelectorAll('.contentImg');
let clickTitle = document.querySelectorAll('.title');

const pStat = {
    rank: 'newbie',
    collection: 0,
    booksReaded: 0
};

function setStat() {
    const historyData = getHistory(cacheKey2);
    console.log(historyData.length)
    console.log(clickImg.length)
    let count = historyData.length;
    if (count <= 10) {
        pStat.rank = 'Newbie';
    } else if (count <= 50) {
        pStat.rank = 'Mediocre';
    } else if (count <= 100) {
        pStat.rank = 'Master';
    } else {
        pStat.rank = 'Legendary';
        console.log(count)
    }
    pStat.collection = clickImg.length;
    pStat.booksReaded = count;
    console.log('func setStat')
    console.log(pStat)
    recordHistory(pStat, cacheKey1);
}

for (const click of clickImg) {
    click.addEventListener('click', function (event) {
        const target = event.target;
        const itemData = {
            title: null,
            timestamp: null
        };
        itemData.title = target.getAttribute('alt');
        itemData.timestamp = new Date().toLocaleString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        });
        recordHistory(itemData, cacheKey2);
        setStat();
        renderingData();
    });
}

for (const click of clickTitle) {
    click.addEventListener('click', function (event) {
        const target = event.target
        const itemData = {
            title: null,
            timestamp: null
        };
        itemData.title = target.innerText
        itemData.timestamp = new Date().toLocaleString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        });
        recordHistory(itemData, cacheKey2);
        setStat()
        renderingData();
    });
}

const buttonElement = document.getElementById('submitBtn')
const bookTitle = document.getElementById('bookTitle')
const bookAuthor = document.getElementById('bookAuthor')
const bookPublish = document.getElementById('bookPublish')
const bookDesc = document.getElementById('bookDesc')

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
        recordHistory(bookData, cacheKey3);
        setStat();
        renderingData();
    }
})