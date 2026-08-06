import { describe, it, expect, afterEach } from 'vitest';
import { StructuredLogger } from './logger.js';

describe('StructuredLogger', () => {
  const originalCrypto = globalThis.crypto;

  afterEach(() => {
    if (originalCrypto) {
      Object.defineProperty(globalThis, 'crypto', {
        value: originalCrypto,
        configurable: true,
        writable: true
      });
    } else {
      delete globalThis.crypto;
    }
  });

  it('generates a correlation id when crypto.randomUUID is unavailable', () => {
    Object.defineProperty(globalThis, 'crypto', {
      value: {},
      configurable: true,
      writable: true
    });

    const logger = new StructuredLogger();
    const correlationId = logger.generateCorrelationId();

    expect(correlationId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });
});
