const clickImg = document.querySelectorAll('.contentImg');
let clickTitle = document.querySelectorAll('.title');

function setStat() {
    const pStat = {
        rank: 'newbie',
        collection: 0,
        booksReaded: 0
    };
    console.log(booksCount)
    console.log(clickImg.length)
    let count = booksCount;
    if (count <= 10) {
        pStat.rank = 'Newbie';
    } else if (count <= 50) {
        pStat.rank = 'Mediocre';
    } else if (count <= 100) {
        pStat.rank = 'Master';
    } else {
        pStat.rank = 'Legendary';
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

// buttonElement.addEventListener('click', function (event) {
//     let container = document.querySelector('flex-Y-container');
//     const bookData = {
//         title: bookTitle.value,
//         author: bookAuthor.value,
//         published: bookPublish.value,
//         desc: bookDesc.value
//     };
//     let newCollection = document.createElement('div');
//     newCollection.classList.add('flex-X-Container');
//     newCollection.innerHTML = `
//     <div class="contentImg">
//         < img src = "./resources/book vector.png" alt="${bookData.title}">
//     </div>
//     <div class="contentDetail">
//         <h3 class="title">${bookData.title}</h3>
//         <table >
//             <tr>
//                 <td>Author</td>
//                 <td class="author">${bookData.author}</td>
//             </tr>
//             <tr>
//                 <td>Published</td>
//                 <td>${bookData.published}</td>
//             </tr>
//         </table>
//         <p>Description</p>
//         <p>${bookData.desc}</p>
//     </div>`;
//     container.appendChild(newCollection);
// })