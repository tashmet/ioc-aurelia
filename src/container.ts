import {Container as AureliaContainer} from 'aurelia-dependency-injection';
import {AbstractContainer, ServiceIdentifier, ServiceRequest, Resolver} from '@ziqquratu/ioc';

export class AureliaAdapter extends AbstractContainer {
  constructor(
    private container: AureliaContainer
  ) { super(); }

  protected get<T>(req: ServiceIdentifier<T>): T {
    return this.container.get(req as any);
  }

  public registerResolver<T>(key: ServiceIdentifier<T>, resolver: Resolver<T>): void {
    this.container.unregister(key);
    this.container.registerHandler(key, () => resolver.resolve(this));
  }

  public isRegistered<T>(key: ServiceRequest<T>): boolean {
    return this.container.hasResolver(key);
  }
}
