require('dotenv').config();

const { leerinput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async() => {

    const busquedas = new Busquedas();
    let opt;

    do{

        opt = await inquirerMenu();

        switch (opt) {

            case 1:
                // Mostrar mensaje

                const termino = await leerinput("Ciudad: ");

                // Buscar los lugares
                
                const lugares = await busquedas.ciudad(termino);

                // Seleccionar lugar
                
                const id = await listarLugares(lugares);

                if(id === '0') continue; // continuar con la siguiente interaccion

                const lugarSel = lugares.find(l => l.id === id);

                // guardar en db

                busquedas.agregarHistorial(lugarSel.nombre);

                // Clima    

                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

                // Mostrar resultados

                console.log("\nInformacion de la ciudad\n".white);
                console.log('Ciudad:',lugarSel.nombre.blue);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Minima:', clima.min);
                console.log('Maxima:', clima.max);
                console.log('Como esta el clima:', clima.desc.green);

            break;

            case 2:

                busquedas.historialCapitalizado.forEach((lugar, index) => {
                    const idx = `${index+1}.`.green;
                    console.log(`${idx} ${lugar}`);
                });

            break;

            case 0:

            break;

        }
    
        if (opt !== 0) await pausa();

    }while(opt !== 0);


  

}

main();