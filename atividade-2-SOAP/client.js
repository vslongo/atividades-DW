const soap = require('soap');

// URL do WSDL do serviço
const wsdlUrl = 'http://localhost:8000/mdc?wsdl';

// Dados da imagem
const width = 1920;
const height = 1080;

// Criar um cliente SOAP
soap.createClient(wsdlUrl, function(err, client) {
  if (err) {
    console.error('Erro ao criar cliente SOAP:', err);
    return;
  }

  // Chamar o método calcularMDC do serviço
  client.calcularMDC({ x: width, y: height }, function(err, result) {
    if (err) {
      console.error('Erro ao chamar o método calcularMDC:', err);
    } else {
      const mdc = result.resultado;
      const aspectRatioX = width / mdc;
      const aspectRatioY = height / mdc;
      console.log('MDC:', mdc);
      console.log('Aspect Ratio:', aspectRatioX, ':', aspectRatioY);
    }
  });
});
