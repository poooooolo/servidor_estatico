const titulo = document.querySelector("h1");

titulo.innerHTML = titulo.innerHTML.split("").map(l => {
    return l != "" ? `<span style="color:rgb(${[0,0,0].map(() => {
        return Math.floor(Math.random() * 256);
    }).join(",")})">${l}</span>` : l;
}).join("");