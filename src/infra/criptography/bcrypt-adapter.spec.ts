import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

export const throwError = (): never => {
  throw new Error()
}

const salt = 12

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise((resolve) => resolve('hash'))
  }
}))

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_values')
    expect(hashSpy).toHaveBeenCalledWith('any_values', salt)
  })

  test('Should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_values')
    expect(hash).toBe('hash')
  })

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError)
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })
})
