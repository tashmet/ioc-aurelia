import {Logger, Provider} from '@ziqquratu/core';
import {Container as AureliaContainer} from 'aurelia-dependency-injection';
import {AureliaAdapter} from '../src/container';
import {expect} from 'chai';
import 'mocha';

class MockLogger implements Logger {
  public parent = null;
  public scope = [];
  public info() { return; }
  public warn() { return; }
  public debug() { return; }
  public error() { return; }
  public inScope(scope: string) { return new MockLogger(); }
}

describe('AureliaAdapter', () => {
  let container = new AureliaAdapter(new AureliaContainer(), new MockLogger());

  describe('constant value definition', () => {
    it('should store and retrieve a constant value', () => {
      expect(() => container.register(Provider.ofInstance('test.Constant', 123))).to.not.throw();
      expect(container.resolve('test.Constant')).to.equal(123);
    });
    it('should override a previous binding', () => {
      expect(() => container.register(Provider.ofInstance('test.Constant', 456))).to.not.throw();
      expect(container.resolve('test.Constant')).to.equal(456);
    });
  });
});
