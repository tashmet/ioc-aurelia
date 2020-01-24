import {Container as AureliaContainer} from 'aurelia-dependency-injection';
import {AbstractContainer, Logger, ServiceIdentifier, ServiceRequest, Resolver} from '@ziqquratu/core';

export class AureliaAdapter extends AbstractContainer {
  constructor(
    private container: AureliaContainer,
    logger: Logger,
  ) { super(logger.inScope('AureliaAdapter')); }

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
