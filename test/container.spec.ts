import {AureliaAdapter} from '../src/container';
import {Container as AureliaContainer} from 'aurelia-dependency-injection';
import {expect} from 'chai';
import 'mocha';

describe('AureliaAdapter', () => {
  let container = new AureliaAdapter(new AureliaContainer());

  describe('constant value definition', () => {
    it('should store and retrieve a constant value', () => {
      expect(() => container.registerInstance('test.Constant', 123)).to.not.throw();
      expect(container.resolve('test.Constant')).to.equal(123);
    });
    it('should override a previous binding', () => {
      expect(() => container.registerInstance('test.Constant', 456)).to.not.throw();
      expect(container.resolve('test.Constant')).to.equal(456);
    });
  });
});
