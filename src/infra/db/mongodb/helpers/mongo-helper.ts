import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  cliente: null as unknown as MongoClient,

  async connect (uri: string): Promise<void> {
    this.cliente = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.cliente.close()
  },

  getCollection (name: string): Collection {
    return this.cliente.db().collection(name)
  },

  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  }
}
