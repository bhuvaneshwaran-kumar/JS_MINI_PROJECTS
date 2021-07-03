const CLIENT_ID = `ZG5zKEUciEQconPcNMJnt1nNw5AmCuiq1lQF3VfJCrA`
const API_URL = `https://api.unsplash.com/photos/?client_id=${CLIENT_ID}`


const colOne = document.querySelector('.col-1')
const colTwo = document.querySelector('.col-2')
const colThree = document.querySelector('.col-3')
const loaderDiv = document.querySelector('.loader')
let initialCount = 1

//aws rdx aws lamda

// this is to fetch data from unsplash when the last img div intersect to the view port
const interSectionObserverToFetchData = target => {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initialCount++
                getPictures() // fetch data
                observer.disconnect();
            }
        });
    });
    io.observe(target)
}

// this is to swith data-src attribute to src.
const interSectionObserverToLasyLoadImg = target => {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => { entry.target.setAttribute('src', entry.target.getAttribute('data-src')) }, 400)
                observer.disconnect();
            }
        });
    });
    io.observe(target)
}

//setAttribute to the element.
const setAttributes = (imgElm, img) => {
    imgElm.src = img.demoUrl
    imgElm.setAttribute('desc', img.desc)
    imgElm.setAttribute('data-src', img.srcUrl)
}



//add image to dom elements
const addElementToColumn = (element, arr, lastArr) => {

    if (lastArr) {
        arr.forEach(async (img, index) => {
            const imgElm = document.createElement('img')
            if (index === arr.length - 1) interSectionObserverToFetchData(imgElm)
            setAttributes(imgElm, img)
            interSectionObserverToLasyLoadImg(imgElm)
            element.appendChild(imgElm)  //add to the DOM
        })
    } else {
        arr.forEach((img) => {
            const imgElm = document.createElement('img')
            setAttributes(imgElm, img)
            interSectionObserverToLasyLoadImg(imgElm)
            element.appendChild(imgElm)  //add to the DOM

        })
    }


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
    try {
        const result = await fetch(API_URL + `&page=${initialCount}&per_page=12`)
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

    } catch (err) {

    }

    loaderDiv.classList.toggle('active')


}

getPictures()
