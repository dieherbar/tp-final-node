import { parseString, processors } from 'xml2js';
//import { create } from 'xmlbuilder2';

export const procesarSoap = (req, res) => {
    let rawData = '';
    const idsValidos = ['A87654321', 'J99542516', 'C99999999'];

    req.setEncoding('utf8');

    req.on('data', chunk => {
        rawData += chunk;
    });

    req.on('end', () => {
        console.log('\n===== NUEVA SOLICITUD =====');
        console.log('🧾 HEADERS:');
        console.log(req.headers);
        console.log('📦 BODY:');
        console.log(rawData);
        console.log('===========================\n');

        parseString(rawData, {
            explicitArray: false,
            ignoreAttrs: false,
            tagNameProcessors: [processors.stripPrefix]
        }, (err, result) => {
            if (err) {
                console.error('❌ Error al parsear SOAP XML:', err);
                return res.status(400).send('XML inválido');
            }

            const body = result.Envelope?.Body;
            const data = body?.Z_FI_WS_CONS_DEUD_ACR;

            if (!data) {
                console.error('❌ Estructura inválida:', JSON.stringify(result, null, 2));
                return res.status(400).send('Estructura SOAP inválida');
            }

            const id = data.STCD1;

            console.log(`✅ ID recibido: ${id}`);

            // Simular timeout si el ID es "timeout"
            if (id === 'timeout') {
                console.log('⏳ Simulando timeout...');
                return setTimeout(() => {
                    const respuestaTimeout = `
                        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
                            <soapenv:Body>
                                <n0:Z_FI_WS_CONS_DEUD_ACRResponse xmlns:n0="urn:sap-com:document:sap:rfc:functions">
                                    <COD_ACR>71m30u7</COD_ACR>
                                    <COD_DEUD></COD_DEUD>
                                </n0:Z_FI_WS_CONS_DEUD_ACRResponse>
                            </soapenv:Body>
                        </soapenv:Envelope>
                    `;
                    res.set('Content-Type', 'text/xml');
                    return res.status(200).send(respuestaTimeout);
                }, 31000);
            }

            // Respuesta si el ID es válido
            if (idsValidos.includes(id)) {
                const respuestaValido = `
                    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
                        <soapenv:Body>
                            <n0:Z_FI_WS_CONS_DEUD_ACRResponse xmlns:n0="urn:sap-com:document:sap:rfc:functions">
                                <COD_ACR>0000527733</COD_ACR>
                                <COD_DEUD></COD_DEUD>
                            </n0:Z_FI_WS_CONS_DEUD_ACRResponse>
                        </soapenv:Body>
                    </soapenv:Envelope>
                `;
                res.set('Content-Type', 'text/xml');
                return res.status(200).send(respuestaValido);
            }

            // Respuesta si el ID no es válido
            const respuestaInvalido = `
                <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
                    <soapenv:Body>
                        <soapenv:Fault>
                            <faultcode>SOAP-ENV:Client</faultcode>
                            <faultstring>ID no valido</faultstring>
                            <detail>
                                <n0:Z_FI_WS_CONS_DEUD_ACRResponse xmlns:n0="urn:sap-com:document:sap:rfc:functions">
                                    <Name>NO_ACR</Name>
                                    <Text></Text>
                                </n0:Z_FI_WS_CONS_DEUD_ACRResponse>
                            </detail>
                        </soapenv:Fault>
                    </soapenv:Body>
                </soapenv:Envelope>
            `;
            res.set('Content-Type', 'text/xml');
            return res.status(400).send(respuestaInvalido);
        });
    });

    req.on('error', err => {
        console.error('❌ Error al recibir datos:', err);
        res.status(500).send('Error al procesar solicitud SOAP');
    });
};



// ⚠️ IMPORTANTE: no pongas más `res.send(...)` fuera de `req.on('end', ...)`
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
