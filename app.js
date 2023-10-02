//MODULOS DE NODE JS 
require('colors');
const fs = require('fs')

//MODULOS DEL PROYECTO

const datosArchivo = require('./datos.json')
const main = async() =>{
    console.clear();
    console.log('//////////////////////////');
    console.log(`//   PROYECTOS CLASES   //`)
    console.log('//////////////////////////\n');

    class Producto {
        #codigoProducto;
        #nombreProductos;
        #inventarioProducto;
        #precioProducto;

        constructor(){
            this.#codigoProducto='';
            this.#nombreProductos='';
            this.#inventarioProducto=0;
            this.#precioProducto=0;
        }

        set setCodigoProducto(value){
            this.#codigoProducto = value;
        }

        get getCodigoProducto(){
            return this.#codigoProducto;
        }

        set setNombreProducto(value){
            this.#nombreProductos = value;
        }

        get getNombreProducto(){
            return this.#nombreProductos;
        }

        set setIntventarioProducto(value){
            this.#inventarioProducto = value;
        }

        get getInventarioProducto(){
            return this.#inventarioProducto;
        }

        set setPrecioProducto(value){
            this.#precioProducto = value;
        }

        get getPrecioProducto(){
            return this.#precioProducto;
        }
    }

    class ProductosTienda{
        #lisaProductos;

        constructor(){
            this.#lisaProductos = [];
        }

        get getListaProductos(){
            return this.#lisaProductos;
        }

        cargaArchivoProductos(){
            //Leer los datos de un arcibo JSON
            //Serializarlos para trabajar los datos como un arreglo de objetos de clase Producto
            let contador = 0;
            if (datosArchivo.length > 0) {
                datosArchivo.forEach(objeto => {
                    contador++;
                    let producto = new Producto;
                    producto.setCodigoProducto = objeto.codigoProducto;
                    producto.setNombreProducto = objeto.nombreProducto;
                    producto.setIntventarioProducto = objeto.inventarioProducto;
                    producto.setPrecioProducto = objeto.precioProducto;
                    this.#lisaProductos.push(producto);
                });
            } else {
                console.log(`EEROR, el archibo datos.json no contiene datoss\n`.bgRed);
            }
            console.log(`Total de profectos cargados ==>`.bgBlue +`${contador}`.bgRed);
        }

        grabaArchiboProductos(){
            //Escribir datos en un archibo almacenado en unidad
            //Deserializacion para converit un arreglo de objetos de clase en cadena JSON
            const instanciaClaseAObjetos = this.getListaProductos.map(producto =>{
                return {
                    codigoProducto: producto.getCodigoProducto,
                    nombreProducto: producto.getNombreProducto,
                    inventarioProducto: producto.getInventarioProducto,
                    precioProducto: producto.getPrecioProducto
                };
            });
            //convertir de array a cadena JSON
            const cadenaJson = JSON.stringify(instanciaClaseAObjetos,null,2)
            //variable con el nombre del archibo
            const nombreArchibo = 'datos.json';
            //Grabar cadena JSON en el archibo 
            fs.writeFileSync(nombreArchibo, cadenaJson, 'utf-8');

            console.log(`DATOS GUARDADOS EN ${nombreArchibo}`.bgMagenta);
        }

        mostrarProdutos(){
            this.getListaProductos.forEach(producto =>{
                console.log(`|    `+ producto.getCodigoProducto + `    |`+
                            `      `+ producto.getNombreProducto + `    |`+
                            `      `+ producto.getInventarioProducto + `    |`+
                            `      `+ producto.getPrecioProducto + `    |`);
            });
        }

    }

    let productosTienda = new ProductosTienda;

    productosTienda.cargaArchivoProductos();

    console.log(`DATOS APERTURA TIENDA`.bgBlue);

    productosTienda.mostrarProdutos();

    productosTienda.getListaProductos.forEach(producto =>{
        producto.setIntventarioProducto = Math.floor(Math.random() * (20 - 1) + 1);
    });

    console.log(`DATOS CIERRE TIENDA`.bgGreen);
    productosTienda.mostrarProdutos();

    productosTienda.grabaArchiboProductos();
}

main();