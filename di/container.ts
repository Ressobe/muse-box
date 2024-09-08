import { repositoriesRegistry } from "./repositoriesRegistry";
import { servicesRegistry } from "./servicesRegistry";

type Constructor<T> = new (...args: any[]) => T;

class Container {
  private implementations = new Map<string, Constructor<any>>();
  private instances = new Map<string, any>();

  constructor(
    private repositoryRegistry: Record<string, Constructor<any>>,
    private serviceRegistry: Record<string, Constructor<any>>,
  ) {
    this.registerImplementations();
  }

  private registerImplementations(): void {
    for (const [key, implementation] of Object.entries(
      this.repositoryRegistry,
    )) {
      this.register(key, implementation);
    }
    for (const [key, implementation] of Object.entries(this.serviceRegistry)) {
      this.register(key, implementation);
    }
  }

  register<T>(key: string, implementation: Constructor<T>): void {
    this.implementations.set(key, implementation);
  }

  get<T>(key: string): T {
    if (this.instances.has(key)) {
      return this.instances.get(key) as T;
    }

    const Implementation = this.implementations.get(key);
    if (!Implementation) {
      throw new Error(`Service ${key} not registered`);
    }

    const instance = new Implementation();
    this.instances.set(key, instance);
    return instance as T;
  }
}

const container = new Container(repositoriesRegistry, servicesRegistry);

export { container };
