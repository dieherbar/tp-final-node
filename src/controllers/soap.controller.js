import { parseString, processors } from 'xml2js';
import { create } from 'xmlbuilder2';

export const procesarSoap = (req, res) => {
    let rawData = '';
    let soapResponse = '';
    const idsValidos = ['A87654321', 'J99542516', 'C99999999'];

    req.setEncoding('utf8');
    req.on('data', chunk => rawData += chunk);

    req.on('end', () => {
        // Ajustamos el parser
        parseString(rawData, {
            explicitArray: false,
            ignoreAttrs: false,
            tagNameProcessors: [processors.stripPrefix]
        }, (err, result) => {
            if (err) {
                console.error('❌ Error al parsear SOAP XML:', err);
                return res.status(400).send('XML inválido');
            }

            // 🪵 Log para ver la estructura completa
            //console.log('✅ XML parseado:', JSON.stringify(result, null, 2));

            // Accedemos al contenido sin importar el prefijo
            const body = result.Envelope?.Body;
            const data = body?.Z_FI_WS_CONS_DEUD_ACR;

            if (!data) {
                console.error('❌ Estructura SOAP inválida: no se encontró Z_FI_WS_CONS_DEUD_ACR');
                return res.status(400).send('Estructura SOAP inválida');
            }

            const id = data.STCD1 || '';
            const centro = data.CENTRO_WG;
            const tipo = data.TIPO;

            console.log('🔎 ID recibido:', id);

            const idValido = idsValidos.includes(id);

            if (idValido) {
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
                    .up().up().end({ prettyPrint: true });
                res.set('Content-Type', 'text/xml')
                res.status(200).send(`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
            <soap-env:Header/>
            <soapenv:Body>
            <n0:Z_FI_WS_CONS_DEUD_ACRResponse xmlns:n0="urn:sap-com:document:sap:rfc:functions">
            <COD_ACR>000000test</COD_ACR>
            </COD_DEUD>
            </n0:Z_FI_WS_CONS_DEUD_ACRResponse>
            </soapenv:Body>
        </soapenv:Envelope>
        `);

            } else {
                // Respuesta para ID inexistente
                soapResponse = create({ version: '1.0' })
                    .ele('soapenv:Envelope', {
                        'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/'
                    })
                    .ele('soapenv:Body')
                    .ele('detail')
                    .ele('n0:Z_FI_WS_CONS_DEUD_ACRResponse', {
                        'xmlns:n0': 'urn:sap-com:document:sap:rfc:functions'
                    })
                    .ele('Name').txt('NO_ACR').up()
                    .ele('Text')
                    .up()
                    .end({ prettyPrint: true });
                res.set('Content-Type', 'text/xml')
                res.status(500).send(`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
            <soap-env:Header/>
                <soapenv:Body>
                <soap-env:Fault>
                <faultcode>soap-env:Client</faultcode>
                <faultstring xml:lang="es">NO_ACR</faultstring>
                <detail>
                <n0:Z_FI_WS_CONS_DEUD_ACR.Exception xmlns:n0="urn:sap-com:document:sap:rfc:functions">
                <Name>NO_ACR</Name>
                <Text></Text>
                </n0:Z_FI_WS_CONS_DEUD_ACR.Exception>
                </detail>
                </soap-env:Fault>
                </soapenv:Body>
            </soapenv:Envelope>
        `);
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
                                        'COD_ACR': '71m30u7',
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


            /*    res.set('Content-Type', 'application/xml');
                return res.status(200).send(soapResponse);*/
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
                        <COD_ACR>000000001</COD_ACR>
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
