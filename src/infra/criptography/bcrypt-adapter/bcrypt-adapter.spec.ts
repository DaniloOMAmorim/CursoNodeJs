import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'
import env from '../../../main/config/env'

export const throwError = (): never => {
  throw new Error()
}

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise((resolve) => resolve('hash'))
  },
  async compare (): Promise<boolean> {
    return new Promise((resolve) => resolve(true))
  }
}))

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(env.saltBcrypt)
}

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_values')
    expect(hashSpy).toHaveBeenCalledWith('any_values', env.saltBcrypt)
  })

  test('Should return a valid hash on hash success', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_values')
    expect(hash).toBe('hash')
  })

  test('Should throw if hash throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError)
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })

  test('Should call compare with correct values', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_values', 'any_hash')
    expect(compareSpy).toHaveBeenCalledWith('any_values', 'any_hash')
  })

  test('Should return true when compare success', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_values', 'any_hash')
    expect(isValid).toBe(true)
  })

  test('Should return false when compare fails', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const isValid = await sut.compare('any_values', 'any_hash')
    expect(isValid).toBe(false)
  })

  test('Should throw if compare throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(throwError)
    const promise = sut.compare('any_values', 'any_hash')
    await expect(promise).rejects.toThrow()
  })
})
