const CLIENT_ID = `ZG5zKEUciEQconPcNMJnt1nNw5AmCuiq1lQF3VfJCrA`
const API_URL = `https://api.unsplash.com/photos/?client_id=${CLIENT_ID}`


const colOne = document.querySelector('.col-1')
const colTwo = document.querySelector('.col-2')
const colThree = document.querySelector('.col-3')
const loaderDiv = document.querySelector('.loader')
let initialCount = 1

//aws rdx aws lamda

const interSectionObserverToFetchData = target => {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initialCount++
                getPictures()
                observer.disconnect();
            }
        });
    });
    io.observe(target)
}

const interSectionObserverToLasyLoadImg = target => {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(entry.target)
                entry.target.setAttribute('src', entry.target.getAttribute('data-src'))
                observer.disconnect();
            }
        });
    });
    io.observe(target)
}



//add image to dom elements
const addElementToColumn = (element, arr, lastArr) => {
    if (lastArr) {
        arr.forEach((img, index) => {
            const imgElm = document.createElement('img')

            if (index === arr.length - 1) {
                const imgElm = document.createElement('img')
                imgElm.src = img.demoUrl
                imgElm.setAttribute('desc', img.desc)
                imgElm.setAttribute('data-src', img.srcUrl)
                element.appendChild(imgElm)
                interSectionObserverToFetchData(imgElm)
                interSectionObserverToLasyLoadImg(imgElm)
                return
            }

            imgElm.src = img.demoUrl
            imgElm.setAttribute('data-src', img.srcUrl)
            imgElm.setAttribute('desc', img.desc)

            element.appendChild(imgElm)
            interSectionObserverToLasyLoadImg(imgElm)
        })
        return
    }

    arr.forEach((img) => {
        const imgElm = document.createElement('img')
        imgElm.src = img.demoUrl
        imgElm.setAttribute('data-src', img.srcUrl)
        imgElm.setAttribute('desc', img.desc)
        element.appendChild(imgElm)
        interSectionObserverToLasyLoadImg(imgElm)

    })
}


//splitArrayIntoChunksOfLen
function splitArrayIntoChunksOfLen(arr, len) {
    var chunks = [], i = 0, n = arr.length;
    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }
    return chunks;
}

//fetch images from unsplash api
const getPictures = async () => {
    loaderDiv.classList.toggle('active')
    const result = await fetch(API_URL + `&page=${initialCount}&per_page=12&w=100&h=100`)
    const datas = await result.json()

    let fullArray = await datas.map((data) => {

        let img = {
            desc: data.description,
            demoUrl: data.urls.regular.replace('1080', 10),
            srcUrl: data.urls.regular
        }
        return img
    })


    let [imgArrOne, imgArrTwo, imgArrThree] = splitArrayIntoChunksOfLen(fullArray, 4)


    addElementToColumn(colOne, imgArrOne, false)
    addElementToColumn(colTwo, imgArrTwo, false)
    addElementToColumn(colThree, imgArrThree, true)

    console.log(imgArrOne, imgArrTwo, imgArrThree)
    loaderDiv.classList.toggle('active')


}

getPictures()
