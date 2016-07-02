export class Settings {
  public host: string
  public userName: string
  public password: string
  public displayName: string
  public jql: string
  public protocol: string
  public avatarUrl: string

  constructor(
  ){
    this.protocol = 'https'
  }
}