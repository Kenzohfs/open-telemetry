const opentelemetry = require("@opentelemetry/sdk-node");
const {
  AmqplibInstrumentation,
} = require("@opentelemetry/instrumentation-amqplib");
const { SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const {
  ExpressInstrumentation,
} = require("opentelemetry-instrumentation-express");
const { JaegerExporter } = require("@opentelemetry/exporter-jaeger");
const jaegerEndpoint =
  process.env.JAEGER_ENDPOINT || "http://localhost:14268/api/traces";

let exporter;
let protocolInfo = {};

exporter = new JaegerExporter({
  endpoint: jaegerEndpoint,
});
protocolInfo = {
  type: "Jaeger",
  transport: "HTTP",
  encoding: "Thrift (Binary)",
  port: "14268",
  endpoint: jaegerEndpoint,
};

// Log do protocolo sendo usado
console.log("📊 OpenTelemetry Configuration:");
console.log(`   Protocol: ${protocolInfo.type}`);
console.log(`   Transport: ${protocolInfo.transport}`);
console.log(`   Encoding: ${protocolInfo.encoding}`);
console.log(`   Port: ${protocolInfo.port}`);
console.log(`   Endpoint: ${protocolInfo.endpoint}`);
console.log("");

const sdk = new opentelemetry.NodeSDK({
  spanProcessor: new SimpleSpanProcessor(exporter),
  instrumentations: [
    new AmqplibInstrumentation(),
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
  ],
  serviceName: process.env.SERVICE,
});
sdk.start();
