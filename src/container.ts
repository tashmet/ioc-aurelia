import {Container as AureliaContainer} from 'aurelia-dependency-injection';
import {AbstractContainer, ServiceIdentifier, ServiceRequest, Resolver} from '@ziggurat/tiamat';

export class AureliaAdapter extends AbstractContainer {
  constructor(
    private container: AureliaContainer
  ) { super(); }

  public get<T>(req: ServiceRequest<T>): T {
    return req instanceof Resolver ? req.get(this) : this.container.get(req);
  }

  public registerResolver<T>(key: ServiceIdentifier<T>, resolver: Resolver<T>) {
    this.container.unregister(key);
    this.container.registerHandler(key, () => resolver.get(this));
  }

  public isRegistered<T>(key: ServiceRequest<T>): boolean {
    return this.container.hasResolver(key);
  }
}
