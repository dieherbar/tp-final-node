import { parseString } from 'xml2js';
import { create } from 'xmlbuilder2';

export const procesarSoap = (req, res) => {
    let rawData = '';
    let soapResponse = '';
    const idsValidos = ['A87654321', 'J99542516', 'C99999999'];

    req.setEncoding('utf8');
    req.on('data', chunk => rawData += chunk);

    req.on('end', () => {
        parseString(rawData, { explicitArray: false }, (err, result) => {
            if (err) {
                console.error('Error al parsear SOAP XML:', err);
                return res.status(400).send('XML inválido');
            }

            // Accedemos al contenido dentro del Body
            const body = result['soapenv:Envelope']?.['soapenv:Body'];
            const data = body?.['urn:Z_FI_WS_CONS_DEUD_ACR'];
            const id = data?.['STCD1']; // Este es el ID que nos interesa


            if (!data) {
                return res.status(400).send('Estructura SOAP inválida');
            }

            const centro = data['CENTRO_WG'];
            const tipo = data['TIPO'];


            // Simulación de respuesta

            const idValido = idsValidos.includes(id);
            if (idsValidos.includes(id)) {
                // Respuesta para ID válido
                soapResponse = create({ version: '1.0' })
                    .ele('soapenv:Envelope', {
                        'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/'
                    })
                    .ele('soapenv:Body')
                    .ele('n0:Z_FI_WS_CONS_DEUD_ACRResponse', {
                        'xmlns:n0': 'urn:sap-com:document:sap:rfc:functions'
                    })
                    .ele('COD_ACR').txt('0000527733').up()
                    .ele('COD_DEUD').txt('').up()
                    .up()
                    .up()
                    .end({ prettyPrint: true });
            } else {
                // Respuesta para ID inexistente
                soapResponse = create({ version: '1.0' })
                    .ele('soapenv:Envelope', {
                        'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/'
                    })
                    .ele('soapenv:Body')
                    /*.ele('n0:Z_FI_WS_CONS_DEUD_ACRResponse')
                    .ele('COD_ACR').txt('').up()
                    .ele('COD_DEUD').txt('').up()
                    .up()
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
            }
            
            // Simular timeout si el ID es "timeout"
            if (id === 'timeout') {
                console.log('⏳ Simulando timeout de 30 segundos...');
                return setTimeout(() => {
                    const respuestaTimeout = create({ version: '1.0' })
                        .ele({
                            'soapenv:Envelope': {
                                '@xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
                                '@xmlns:n0': 'urn:sap-com:document:sap:rfc:functions',
                                'soapenv:Body': {
                                    'n0:Z_FI_WS_CONS_DEUD_ACRResponse': {
                                        'COD_ACR': '',
                                        'COD_DEUD': ''
                                    }
                                }
                            }
                        })
                        .end({ prettyPrint: true });

                    res.set('Content-Type', 'application/xml');
                    return res.status(200).send(respuestaTimeout);
                }, 35000); // 35 segundos de espera
            }


            res.set('Content-Type', 'application/xml');
            return res.status(200).send(soapResponse);
        });
    });
};

export const procesarSoapDebug = (req, res) => {
    let rawBody = '';
    req.setEncoding('utf8');

    req.on('data', chunk => {
        rawBody += chunk;
    });

    req.on('end', () => {
        console.log('\n===== NUEVA SOLICITUD =====');
        console.log('🧾 HEADERS:');
        console.log(req.headers);
        console.log('📦 BODY:');
        console.log(rawBody);
        console.log('===========================\n');

        res.set('Content-Type', 'text/xml');
        res.status(200).send(`
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
                <soapenv:Body>
                    <n0:Z_FI_WS_CONS_DEUD_ACRResponse xmlns:n0="urn:sap-com:document:sap:rfc:functions">
                        <COD_ACR>0000000000</COD_ACR>
                        <COD_DEUD></COD_DEUD>
                    </n0:Z_FI_WS_CONS_DEUD_ACRResponse>
                </soapenv:Body>
            </soapenv:Envelope>
        `);
    });

    req.on('error', err => {
        console.error('❌ Error al recibir datos:', err);
        res.status(500).send('Error al procesar solicitud SOAP');
    });
};
