import fs from 'fs';
import path from 'path';
import { BaseEntity } from './types';

export interface Repository<T extends BaseEntity> {
  list(filter?: (item: T) => boolean): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: Omit<T, 'id'> | T): Promise<T>;
  update(id: string, partial: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
  count(filter?: (item: T) => boolean): Promise<number>;
  replaceAll(items: T[]): Promise<void>;
}

export class JsonFileRepository<T extends BaseEntity> implements Repository<T> {
  private filePath: string;
  private defaultSeed: T[];

  constructor(collectionName: string, defaultSeed: T[] = []) {
    const dataDir = path.resolve(process.cwd(), 'server', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    this.filePath = path.join(dataDir, `${collectionName}.json`);
    this.defaultSeed = defaultSeed;
    this.ensureInitialized();
  }

  private ensureInitialized(): void {
    if (!fs.existsSync(this.filePath)) {
      this.writeSync(this.defaultSeed);
    } else {
      try {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed) || parsed.length === 0) {
          this.writeSync(this.defaultSeed);
        }
      } catch {
        this.writeSync(this.defaultSeed);
      }
    }
  }

  private readSync(): T[] {
    try {
      const raw = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(raw);
    } catch (err) {
      console.error(`Error reading ${this.filePath}:`, err);
      return [...this.defaultSeed];
    }
  }

  private writeSync(data: T[]): void {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error(`Error writing ${this.filePath}:`, err);
    }
  }

  async list(filter?: (item: T) => boolean): Promise<T[]> {
    const all = this.readSync();
    if (!filter) return all;
    return all.filter(filter);
  }

  async findById(id: string): Promise<T | null> {
    const all = this.readSync();
    return all.find((item) => item.id === id) || null;
  }

  async create(data: Omit<T, 'id'> | T): Promise<T> {
    const all = this.readSync();
    const id = 'id' in data && data.id ? data.id : `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();
    const newItem = {
      ...data,
      id,
      createdAt: (data as any).createdAt || now,
      updatedAt: now
    } as T;

    all.unshift(newItem);
    this.writeSync(all);
    return newItem;
  }

  async update(id: string, partial: Partial<T>): Promise<T | null> {
    const all = this.readSync();
    const index = all.findIndex((item) => item.id === id);
    if (index === -1) return null;

    const updated = {
      ...all[index],
      ...partial,
      id, // Preserve ID
      updatedAt: new Date().toISOString()
    };

    all[index] = updated;
    this.writeSync(all);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const all = this.readSync();
    const next = all.filter((item) => item.id !== id);
    if (next.length === all.length) return false;
    this.writeSync(next);
    return true;
  }

  async count(filter?: (item: T) => boolean): Promise<number> {
    const all = this.readSync();
    if (!filter) return all.length;
    return all.filter(filter).length;
  }

  async replaceAll(items: T[]): Promise<void> {
    this.writeSync(items);
  }
}
