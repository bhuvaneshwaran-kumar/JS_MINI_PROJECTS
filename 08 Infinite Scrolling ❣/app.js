const CLIENT_ID = `ZG5zKEUciEQconPcNMJnt1nNw5AmCuiq1lQF3VfJCrA`
const API_URL = `https://api.unsplash.com/photos/?client_id=${CLIENT_ID}`

const getPictures = async () => {

    let len = 10
    let res = []
    while (len--) {
        const result = await fetch(API_URL + `&page=${len}&per_page=2`)
        const data = await result.json()
        data.forEach(data => res.push(data.id))
        console.log(len)
    }
    res = new Set(res)
    console.log(res)

}

getPictures()