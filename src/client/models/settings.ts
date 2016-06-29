export class Settings {
  constructor(
    public host: string,
    public user: string,
    public password: string,
    public jql: string,
    public protocol: string = 'https'
  ){}
}