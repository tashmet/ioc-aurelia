import {Container} from '@ziggurat/tiamat';
import {Container as AureliaContainer} from 'aurelia-dependency-injection';
import {AureliaAdapter} from './container';

export function container(cnt: AureliaContainer): Container {
  return new AureliaAdapter(cnt);
}
