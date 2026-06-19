# Declarative Configuration Example

This example demonstrates how to configure the OpenTelemetry Node SDK from a YAML file using `startNodeSDK()` and the `OTEL_CONFIG_FILE` environment variable.

The configuration covers traces, metrics, and logs exported via OTLP HTTP, and demonstrates environment variable substitution for the `x-api-key` header.

## Prerequisites

- Node.js 18+
- Docker (for running the OTLP collector)

## Installation

```sh
# from this directory
npm install
```

## Run the Application

### 1. Start the OTLP collector

```sh
# from this directory
docker compose up
```

This starts an OpenTelemetry Collector that receives OTLP on port 4318 and prints telemetry to the console.

### 2. Run the example

```sh
# from this directory
OTEL_CONFIG_FILE=./otel-config.yaml npm start
```

To substitute a real API key into the headers configured in `otel-config.yaml`:

```sh
OTEL_CONFIG_FILE=./otel-config.yaml OTEL_API_KEY=your-secret-key npm start
```

If `OTEL_API_KEY` is not set, the header defaults to `no-key-set` via the `${OTEL_API_KEY:-no-key-set}` substitution in the YAML.

## How it works

1. `OTEL_CONFIG_FILE` points to `otel-config.yaml`.
2. `startNodeSDK()` reads the file via `@opentelemetry/configuration`, validates it against the schema, and initializes the global tracer, meter, and logger providers.
3. The example emits one span, one counter increment, and one log record.
4. After 2 seconds the SDK shuts down, flushing batch processors to the collector.

## Configuration file

The `otel-config.yaml` file configures:

- **Resource**: `service.name` set to `configuration-example`
- **Traces**: batch processor with OTLP HTTP exporter to `http://localhost:4318/v1/traces`
- **Metrics**: periodic reader with OTLP HTTP exporter to `http://localhost:4318/v1/metrics`
- **Logs**: batch processor with OTLP HTTP exporter to `http://localhost:4318/v1/logs`
- **Env var substitution**: `x-api-key` header uses `${OTEL_API_KEY:-no-key-set}`

## Useful links

- [OpenTelemetry Declarative Configuration Specification](https://opentelemetry.io/docs/specs/otel/configuration/)
- [@opentelemetry/configuration package](https://github.com/open-telemetry/opentelemetry-js/tree/main/experimental/packages/configuration)
- [@opentelemetry/sdk-node package](https://github.com/open-telemetry/opentelemetry-js/tree/main/experimental/packages/opentelemetry-sdk-node)

## LICENSE

Apache License 2.0
