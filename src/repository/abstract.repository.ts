import { Logger, NotFoundException } from '@nestjs/common';
import {
  ClientSession,
  FilterQuery,
  Model,
  Types,
  UpdateQuery,
} from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { CreateIndexesOptions } from 'mongodb';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async startSession(): Promise<ClientSession> {
    return await this.model.startSession();
  }

  async batchWrite(documents: Omit<TDocument, '_id'>[]): Promise<TDocument[]> {
    const session = await this.model.startSession();
    session.startTransaction();
    try {
      const createdDocuments = [];
      for (const document of documents) {
        const createdDocument = new this.model({
          ...document,
          _id: new Types.ObjectId(),
        });
        createdDocuments.push(
          (await createdDocument.save()).toJSON() as unknown as TDocument,
        );
      }
      await session.commitTransaction();
      return createdDocuments;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    try {
      const createdDocument = new this.model({
        ...document,
        _id: new Types.ObjectId(),
      });
      return (await createdDocument.save()).toJSON() as unknown as TDocument;
    } catch (err) {
      console.log(err);
    }
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery).lean<TDocument>();

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      return null;
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
    return this.model.findOneAndDelete(filterQuery, { lean: true });
  }

  async createIndex(options: CreateIndexesOptions) {
    return this.model.createIndexes(options as any);
  }

  async createOrUpdate(update: UpdateQuery<TDocument>) {
    return await this.model.findOneAndUpdate(
      {},
      { $set: this.updateQuerytoDotNotation(update) },
      { upsert: true },
    );
  }

  async updateQuerytoDotNotation(obj, parent = '', res = {}) {
    for (const key in obj) {
      const propName = parent ? parent + '.' + key : key;
      if (typeof obj[key] == 'object') {
        this.updateQuerytoDotNotation(obj[key], propName, res);
      } else {
        res[propName] = obj[key];
      }
    }
    return res;
  }
}
