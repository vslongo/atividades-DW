const express = require('express');
const soap = require('soap');

const app = express();

// Definição do serviço
const service = {
  MDC_Service: {
    MDC_Port: {
      calcularMDC: function(args) {
        const x = args.x;
        const y = args.y;
        let a = x;
        let b = y;
        
        // Algoritmo de Euclides para calcular o MDC
        while (b != 0) {
          let temp = b;
          b = a % b;
          a = temp;
        }
        return { resultado: a };
      }
    }
  }
};

// WSDL manual
const xml = `<?xml version="1.0" ?>
<definitions name="MDC_Service"
  targetNamespace="http://localhost:8000/mdc"
  xmlns:tns="http://localhost:8000/mdc"
  xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema"
  xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/"
  xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"
  xmlns="http://schemas.xmlsoap.org/wsdl/">
  <message name="calcularMDCRequest">
    <part name="x" type="xsd:int"/>
    <part name="y" type="xsd:int"/>
  </message>
  <message name="calcularMDCResponse">
    <part name="resultado" type="xsd:int"/>
  </message>
  <portType name="MDC_PortType">
    <operation name="calcularMDC">
      <input message="tns:calcularMDCRequest"/>
      <output message="tns:calcularMDCResponse"/>
    </operation>
  </portType>
  <binding name="MDC_Binding" type="tns:MDC_PortType">
    <soap:binding style="rpc" transport="http://schemas.xmlsoap.org/soap/http"/>
    <operation name="calcularMDC">
      <soap:operation soapAction="http://localhost:8000/mdc#calcularMDC"/>
      <input>
        <soap:body use="encoded" namespace="http://localhost:8000/mdc" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
      </input>
      <output>
        <soap:body use="encoded" namespace="http://localhost:8000/mdc" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
      </output>
    </operation>
  </binding>
  <service name="MDC_Service">
    <port name="MDC_Port" binding="tns:MDC_Binding">
      <soap:address location="http://localhost:8000/mdc"/>
    </port>
  </service>
</definitions>`;

// Criação do servidor SOAP
soap.listen(app, '/mdc', service, xml, function() {
  console.log(`Servidor SOAP rodando em http://localhost:8000/mdc`);
});

// Iniciar o servidor HTTP
const port = 8000;
app.listen(port, () => {
  console.log(`Servidor HTTP rodando em http://localhost:${port}`);
});
