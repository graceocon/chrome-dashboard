// BACKGROUND IMAGE FROM UNSPLASH

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=gradient")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
		document.getElementById("image-info").innerHTML = 
            `<p>IMG LOCATION | ${data.location.name}</p>
            <p>IMG AUTHOR | ${data.user.name}</p>
            <p>IMG DESCRIPTION | ${data.description}</p>`
    })
    .catch(err => {
        document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1529528744093-6f8abeee511d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTM5MjEyMzB8&ixlib=rb-4.1.0&q=80&w=1080&quot")`
		document.getElementById("image-info").innerHTML = `<p>IMG AUTHOR | Kenrick Mills</p>`
    })



// CRYPTO - BITCOIN

fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        document.getElementById("crypto1-header").innerHTML = `
            <img class="crypto-img" src=${data.image.small} />
            <span>${data.name}</span>
        `
        document.getElementById("crypto1").innerHTML += `
        <p>🟢 $81,564 AUD</p>    
        <p class="crypto-font-md">🔴 $${data.market_data.current_price.aud} AUD | $${data.market_data.current_price.usd} USD</p>
        <p class="crypto-high-low">🔺 $${data.market_data.high_24h.aud} | 🔻 $${data.market_data.low_24h.aud}</p>
        `
    })
    .catch(err => console.error(err))

// CRYPTO - ETHERIUM

fetch("https://api.coingecko.com/api/v3/coins/ethereum")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        document.getElementById("crypto2-header").innerHTML = `
            <img class="crypto-img" src=${data.image.small} />
            <span>${data.name}</span>
        `
        document.getElementById("crypto2").innerHTML += `
            <p>🟢 $5,992 AUD</p>
            <p class="crypto-font-md">🔴 $${data.market_data.current_price.aud} AUD | $${data.market_data.current_price.usd} USD</p>
            <p class="crypto-high-low">🔺 $${data.market_data.high_24h.aud} 🔻 $${data.market_data.low_24h.aud}</p>
        `
    })
    .catch(err => console.error(err))

// CRYPTO - SOLANA

fetch("https://api.coingecko.com/api/v3/coins/solana")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        document.getElementById("crypto3-header").innerHTML = `
            <img class="crypto-img" src=${data.image.small} />
            <span>${data.name}</span>
        `
        document.getElementById("crypto3").innerHTML += `
            <p>🟢 $326/$306 AUD</p>  
            <p class="crypto-font-md">🔴 $${data.market_data.current_price.aud} AUD | $${data.market_data.current_price.usd} USD</p>
            <p class="crypto-high-low">🔺 $${data.market_data.high_24h.aud} 🔻 $${data.market_data.low_24h.aud}</p>
        `
    })
    .catch(err => console.error(err))

// SECTION 2 - DATE AND TIME

function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-au", {timeStyle: "medium"})
}
setInterval(getCurrentTime, 1000)

function getCurrentDate() {
    const date = new Date()
    document.getElementById("date").textContent = date.toLocaleDateString("en-au", {dateStyle: "long"})
}
getCurrentDate()

// SECTION 3 - WEATHER

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <div class="weather-top">    
                    <img class="weather-img" src=${iconUrl} />
                    <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                </div>
                <div class="weather-bottom">
                    <p class="weather-city">${data.name}</p>
                    <p>Feels like | ${Math.round(data.main.feels_like)}º</p>
                    <p>Min temp | ${Math.round(data.main.temp_min)}º</p>
                    <p>Max tem | ${Math.round(data.main.temp_max)}º</p>
                </div>
            `
        })
        .catch(err => console.error(err))
})

navigator.geolocation.getCurrentPosition(position => {
    fetch(`api.openweathermap.org/data/2.5/forecast/daily?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&cnt=1`)
    .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            document.getElementById("xtra-weather").innerHTML = `
                <div class="weather-bottom">
                    <p>Feels like | ${Math.round(data.list[0].feels_like)}º</p>
                    <p>Min temp | ${Math.round(data.list[0].temp.min)}º</p>
                    <p>Max tem | ${Math.round(data.list[0].temp.max)}º</p>
                </div>
            `
        })
        .catch(err => console.error(err))
})