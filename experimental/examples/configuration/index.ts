/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { metrics, trace } from '@opentelemetry/api';
import { logs, SeverityNumber } from '@opentelemetry/api-logs';
import { startNodeSDK } from '@opentelemetry/sdk-node';

const sdk = startNodeSDK();

const tracer = trace.getTracer('configuration-example');
const meter = metrics.getMeter('configuration-example');
const logger = logs.getLogger('configuration-example');

const span = tracer.startSpan('example-span');
span.setAttribute('example.attribute', 'hello');
span.end();

const counter = meter.createCounter('example.counter');
counter.add(1, { attribute: 'value' });

logger.emit({
  severityNumber: SeverityNumber.INFO,
  severityText: 'INFO',
  body: 'example log record',
});

setTimeout(async () => {
  await sdk.shutdown();
}, 2000);
