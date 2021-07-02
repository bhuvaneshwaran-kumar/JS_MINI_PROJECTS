const CLIENT_ID = `ZG5zKEUciEQconPcNMJnt1nNw5AmCuiq1lQF3VfJCrA`
const API_URL = `https://api.unsplash.com/photos/?client_id=${CLIENT_ID}`


const colOne = document.querySelector('.col-1')
const colTwo = document.querySelector('.col-2')
const colThree = document.querySelector('.col-3')
let initialCount = 1

//aws rdx aws lamda

const interSectionObserver = target => {
    const io = new IntersectionObserver((entries, observer) => {
        console.log(entries)
        entries.forEach(entry => {
            console.log('😍');

            if (entry.isIntersecting) {
                initialCount++
                getPictures()
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

            if (index === arr.length - 1) {
                const imgElm = document.createElement('img')
                imgElm.src = img.url
                imgElm.setAttribute('desc', img.desc)
                element.appendChild(imgElm)

                interSectionObserver(imgElm)

            }

            const imgElm = document.createElement('img')
            imgElm.src = img.url
            imgElm.setAttribute('desc', img.desc)
            element.appendChild(imgElm)
        })
        return
    }

    arr.forEach((img) => {
        const imgElm = document.createElement('img')
        imgElm.src = img.url
        imgElm.setAttribute('desc', img.desc)
        element.appendChild(imgElm)
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

    const result = await fetch(API_URL + `&page=${initialCount}&per_page=12&w=100&h=100`)
    const datas = await result.json()

    let fullArray = await datas.map((data) => {
        let img = {
            desc: data.description,
            url: data.urls.regular
        }
        return img
    })


    let [imgArrOne, imgArrTwo, imgArrThree] = splitArrayIntoChunksOfLen(fullArray, 4)


    addElementToColumn(colOne, imgArrOne, false)
    addElementToColumn(colTwo, imgArrTwo, false)
    addElementToColumn(colThree, imgArrThree, true)

    console.log(imgArrOne, imgArrTwo, imgArrThree)


}
















getPictures()
