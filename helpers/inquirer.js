const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer ?',
        choices:[
         {
            value : 1,
            name: `${'1.'.blue} Buscar ciudad`
        },
        {
            value: 2,
            name: `${'2.'.blue} Historial`
        },
        {
            value: 0,
            name: `${'0.'.blue} Salir`
        },
    ]
    }
]

const inquirerMenu = async() =>{
    
    console.clear();
    console.log('==========================='.bgCyan.white);
    console.log(' Seleccione una opcion '.bold);
    console.log('===========================\n'.bgCyan.white);
    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;

};

const pausa = async() => {
    
const pregunta = [
    {
        type: 'input',
        name: 'pausa',
        message: `Presione ${'ENTER'.yellow} para continuar`,
    }
    ];

    console.log('\n');
    await inquirer.prompt(pregunta);
};

const leerinput = async(message) => {
    const question = [ {
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if(value.length === 0){
                return 'Por favor ingrese un valor';
            }
            return true;
        } 
     } 
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
};

const listarLugares = async (lugares = []) => {

    const choices = lugares.map((lugar,index) => {
        
        const idx = `${index + 1}`.green;

        return {
            value: lugar.id,
            name:  `${idx} ${lugar.nombre}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.red + 'Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas);
    return id;


    // {
    //     value: tareas.id,
    //     name: `${'2.'.green} Listar tareas`
    // },

}

const confirmar = async (message) => {

    const question = {
        type: 'confirm',
        name: 'ok',
        message
    }

    const {ok} = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoChecklist = async (tareas = []) => {

    const choices = tareas.map((tarea,index) => {
        
        const idx = `${index + 1}`.magenta;

        return {
            value: tarea.id,
            name:  `${idx} ${tarea.description}`,
            checked: (tarea.completadoEn) ? true: false,
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(pregunta);
    return ids;


    // {
    //     value: tareas.id,
    //     name: `${'2.'.green} Listar tareas`
    // },

}


module.exports = {
    inquirerMenu,
    pausa,
    leerinput,
    listarLugares,
    confirmar,
    mostrarListadoChecklist
}

