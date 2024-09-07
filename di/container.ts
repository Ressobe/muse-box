import { IAccountsRepository } from "@/src/application/repositories/accounts.repository.interface";
import { IAlbumsRepository } from "@/src/application/repositories/albums.repository.interface";
import { IArtistsRepository } from "@/src/application/repositories/artists.repository.interface";
import { IFollowersRepository } from "@/src/application/repositories/followers.repository.interface";
import { AccountsRepository } from "@/src/infrastructure/repositories/accounts.repository";
import { AlbumsRepository } from "@/src/infrastructure/repositories/albums.repository";
import { ArtistsRepository } from "@/src/infrastructure/repositories/artists.repository";
import { FollowersRepository } from "@/src/infrastructure/repositories/followers.repository";

type Constructor<T> = new (...args: any[]) => T;

class Container {
  private services = new Map<string, Constructor<any>>();

  constructor() {
    this.registerImplementations();
  }

  private registerImplementations(): void {
    // const isTestEnvironment = process.env.NODE_ENV === "test";

    this.register<IAccountsRepository>(
      "IAccountsRepository",
      AccountsRepository,
    );

    this.register<IFollowersRepository>(
      "IFollowersRepository",
      FollowersRepository,
    );

    this.register<IArtistsRepository>("IArtistsRepository", ArtistsRepository);
    this.register<IAlbumsRepository>("IAlbumsRepository", AlbumsRepository);
  }

  register<T>(key: string, implementation: Constructor<T>): void {
    this.services.set(key, implementation);
  }

  get<T>(key: string): T {
    const Implementation = this.services.get(key);
    if (!Implementation) {
      throw new Error(`Service ${key} not registered`);
    }
    return new Implementation() as T;
  }
}

const container = new Container();
export { container };
