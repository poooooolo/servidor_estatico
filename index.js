const {createServer} = require("http");
const fs = require("fs");

function contentType(extension){//para determinar el content type
    switch(extension){
        case "html" : return "text/html";
        case "css" : return "text/css";
        case "js" : return "text/javascript";
        case "jpg" : return "image/jpeg";
        case "png" : return "image/png";
        case "json" : return "application/json";
        default: return "text/plain";
    }

};

function servirFichero(respuesta,ruta,tipo,status){
    respuesta.writeHead(status,{"Content-type" : tipo});//voy a enviar html
    
    let fichero = fs.createReadStream(ruta);

    fichero.pipe(respuesta);

    fichero.on("end", () => {
        respuesta.end();
    })

};

const servidor = createServer((peticion,respuesta) => {
   if(peticion.url == "/"){
        servirFichero(respuesta,"./estaticos/index.html","text/html",200);
   }else{
        let ruta = "./estaticos" + peticion.url;
        fs.stat(ruta,(error,datos)=>{
            if(!error && datos.isFile()){//si lo que estoy buscando existe y ADEMAS es un fichero
                return servirFichero(respuesta,ruta,contentType(ruta.split(".").pop()),200);//retorno para no tener que poner un else
            }
            servirFichero(respuesta,"./404.html","text/html",404);//si no retorno el fichero que quiero retorno el 404
        });
   }
}); 

servidor.listen(process.env.PORT || 3000);//si hay una variable de entorno usala, sino usa el puerto 3000