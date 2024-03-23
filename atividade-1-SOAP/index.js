const soap = require('soap');
const wsdlUrl = 'http://www.dneonline.com/calculator.asmx?WSDL';

const params = {
  intA: 2,
  intB: 3
};

const handleResponse = (err, result) => {
  if (err) {
    console.error('Erro:', err);
  } else {
    console.log('Resultado da adição:', result.AddResult);
  }
};

soap.createClient(wsdlUrl, (err, client) => {
  if (err) {
    console.error('Erro ao criar cliente SOAP:', err);
  } else {
    client.Add(params, handleResponse);
  }
});
