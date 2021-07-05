export interface Encrypter {
  encrypt (value: String): Promise<string>
}
