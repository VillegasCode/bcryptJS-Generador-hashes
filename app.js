//IMPORTAMOS TODOS LOS PAQUETES INSTALADOS EN NUESTRO PROYECTO
const express = require('express');
const app = express();

const bcryptjs = require('bcryptjs');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Declarando variables
let nro = 3;

//SIMULANDO UN LOGIN DE FORMA ASYNC
app.post('/login', async (req, res)=>{
    const user = req.body.user;
    const password = req.body.password;

    //Comprobamos si los datos son correctos
    if (user == 'admin' && password == '12345' && nro > 0){
        //ENCRIPTANDO DE FORMA ASYNCRONA SI LA CLAVE ES CORRECTA
        let salt = bcryptjs.genSaltSync(8);
        let hash = bcryptjs.hashSync(password, salt);

        //Let passwordHash = await bcryptjs.hash(password, 8);
        res.json({
            message: '¡ATENTICACIÓN EXITOSA!',
            passwordHash: hash
        });
    } else if (nro > 0) {
        nro -= 1;
        res.json({
            message: 'Credenciales incorrectas le quedan ' + nro + ' intentos'
        });
    } else {
        res.json({
            message: 'Acceso bloqueado comuníquese con su banco'
        });
    }
});


// //Simulando LOGIN de forma SINCRÓNICA
// app.post('/login', (req, res)=>{
//     const user = req.body.user;
//     const password = req.body.password;

//     //Comprobamos si los datos son correctos
//     if (user == 'admin' && password == '123245'){
//         //ENCRIPTANDO DE FORMA ASYNCRONA SI LA CLAVE ES CORRECTA
//         let salt = bcryptjs.genSaltSync(9);
//         let hashSYNC = bcryptjs.hashSync(password, salt);

//         //Let passwordHash = await bcryptjs.hash(password, 8);
//         res.json({
//             message: '¡ATENTICACIÓN EXITOSA!',
//             passwordHash: hashSYNC
//         });
//     } else {
//         res.json({
//             message: 'Ingrese correctamente sus credenciales'
//         });
//     }
// })

app.listen(3000, ()=>{
    console.log('SERVER UP! ');
})