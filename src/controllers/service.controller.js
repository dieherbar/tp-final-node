import { create } from 'xmlbuilder2';

const idsValidos = ['A87654321', 'B12345678', 'C99999999', 'J99542516'];

export const obtenerRespuesta = (req, res) => {
    //const { centro, id, tipo } = req.query;
    // Soportar tanto GET como POST
    const { centro, id, tipo } = req.method === 'GET' ? req.query : req.body;


    if (!centro || !id || !tipo) {
        return res.status(400).send('Faltan parámetros requeridos: centro, id, tipo');
    }

    // 🚨 SIMULAR TIMEOUT
    const codigoAcreedorTimeout = "0000527733";
    if (id === 'SIMULAR_TIMEOUT') {
        console.log('Simulando demora de 30 segundos...');
        return setTimeout(() => {
            const xml = create({ version: '1.0' })
                .ele('respuesta')
                .ele('codigoEstado').txt('200').up()
                .ele('mensaje').txt('Respuesta demorada (simulación)').up()
                .ele('resultado')
                /*.ele('centro').txt(centro).up()
                .ele('id').txt(id).up()
                .ele('tipo').txt(tipo).up()*/
                .ele('COD_ACR').txt(codigoAcreedorTimeout).up()
                .ele('COD_DEUD').up()
                .ele('codigoRespuesta').txt('0000000000').up()
                .up()
                .end({ prettyPrint: true });

            res.set('Content-Type', 'application/xml');
            res.status(200).send(xml);
        }, 30000); // 30 segundos = 30000 milisegundos
    }

    // Verificamos si el ID es válido
    const idValido = idsValidos.includes(id);

    if (!idValido) {
        const xmlError = create({ version: '1.0' })
            /*.ele('respuesta')
            .ele('codigoEstado').txt('404').up()
            .ele('mensaje').txt('ID no encontrado').up()
            .ele('detalle')
            .ele('idConsultado').txt(id).up()
            .ele('COD_ACR').txt().up()
            .ele('COD_DEUD').up()
            .up()
            .end({ prettyPrint: true });*/
            .ele('detail')
            .ele('n0:Z_FI_WS_CONS_DEUD_ACRResponse', {
                'xmlns:n0': 'urn:sap-com:document:sap:rfc:functions'
                })
            .ele('Name').txt('NO_ACR').up()
            .ele('Text')
            .up()
            .end({ prettyPrint: true });


res.set('Content-Type', 'application/xml');
return res.status(404).send(xmlError);
    }

const codigoAcreedor = "0000733527";

const xml = create({ version: '1.0' })
    /*.ele('respuesta')
    .ele('codigoEstado').txt('200').up()
    .ele('mensaje').txt('Consulta exitosa').up()
    .ele('resultado')
    .ele('centro').txt(centro).up()
     .ele('id').txt(id).up()
     .ele('tipo').txt(tipo).up()*/
    //.ele('detail')
    .ele('n0:Z_FI_WS_CONS_DEUD_ACRResponse', {
        'xmlns:n0': 'urn:sap-com:document:sap:rfc:functions'
    })
    .ele('COD_ACR').txt(codigoAcreedor).up()
    .ele('COD_DEUD').up()
    .up()
    .end({ prettyPrint: true });

/*
const xml = create({ version: '1.0' })
.ele('respuesta')
    .ele('codigoEstado').txt('200').up()
    .ele('mensaje').txt('Consulta exitosa').up()
    .ele('resultado')
        .ele('centro').txt(centro).up()
        .ele('id').txt(id).up()
        .ele('tipo').txt(tipo).up()
        .ele('COD_ACR').txt(codigoRespuesta).up()
    .up()
.end({ prettyPrint: true });*/


res.set('Content-Type', 'application/xml');
res.status(200).send(xml);
};
