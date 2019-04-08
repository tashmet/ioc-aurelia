import 'reflect-metadata';
import {Container as AureliaContainer, inject} from 'aurelia-dependency-injection';
import {Newable} from '@ziggurat/meta';
import {
  Container, ServiceIdentifier, RegistrationPropertyAnnotation
} from '@ziggurat/tiamat';

export class AureliaAdapter implements Container {
  constructor(
    private container: AureliaContainer
  ) {}

  public get<T>(key: ServiceIdentifier<T>): T {
    return this.container.get(key);
  }

  public registerInstance<T>(key: ServiceIdentifier<T>, instance: T) {
    this.container.unregister(key);
    this.container.registerInstance(key, instance);
  }

  public registerSingletonFactory<T>(
    key: ServiceIdentifier<T>, fn: (...args: any[]) => T, deps: ServiceIdentifier<any>[] = []
  ) {
    let _this = this;
    this.container.unregister(key);
    const {fact} = new class {
      private instance: T;
      public fact = () => {
        if (!this.instance) {
          this.instance = fn(...deps.map(dep => _this.get(dep)));
        }
        return this.instance;
      }
    };
    this.container.registerHandler(key, fact);
  }

  public registerTransientFactory<T>(
    key: ServiceIdentifier<T>, fn: (...args: any[]) => T, deps: ServiceIdentifier<any>[] = []
  ) {
    this.container.unregister(key);
    this.container.registerHandler(key, () => fn(...deps.map(dep => this.get(dep))));
  }

  public registerSingleton<T>(
    key: ServiceIdentifier<T>, ctr: Newable<T>, deps: ServiceIdentifier<any>[] = []
  ) {
    Reflect.decorate([inject(...deps)], ctr);
    for (let providerAttr of RegistrationPropertyAnnotation.onClass(ctr, true)) {
      providerAttr.register(this, key);
    }
    this.container.unregister(key);
    this.container.registerSingleton(key, ctr);
  }

  public registerTransient<T>(
    key: ServiceIdentifier<T>, ctr: Newable<T>, deps: ServiceIdentifier<any>[] = []
  ) {
    Reflect.decorate([inject(...deps)], ctr);
    for (let providerAttr of RegistrationPropertyAnnotation.onClass(ctr, true)) {
      providerAttr.register(this, key);
    }
    this.container.unregister(key);
    this.container.registerTransient(key, ctr);
  }

  public isRegistered<T>(key: ServiceIdentifier<T>): boolean {
    return this.container.hasResolver(key);
  }
}
