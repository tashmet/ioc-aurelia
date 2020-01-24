import {Logger} from '@ziqquratu/core';
import {Container as AureliaContainer} from 'aurelia-dependency-injection';
import {AureliaAdapter} from './container';

export function container(cnt: AureliaContainer) {
  return (logger: Logger) => new AureliaAdapter(cnt, logger);
}
