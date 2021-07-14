import { CompareFieldValidation } from './compare-fields-validation'
import { InvalidParamError } from '../../errors'

const makeSut = (): CompareFieldValidation => {
  return new CompareFieldValidation('field', 'fildToCompare')
}

describe('CompareFields Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      fildToCompare: 'wrong_value'
    })
    expect(error).toEqual(new InvalidParamError('fildToCompare'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      fildToCompare: 'any_value'
    })
    expect(error).toBeFalsy()
  })
})
