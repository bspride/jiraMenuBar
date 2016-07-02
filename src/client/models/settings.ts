export class Settings {
  constructor(
    public host: string,
    public userName: string,
    public password: string,
    public jql: string,
    public protocol: string = 'https',
    public avatarUrl: string
  ){}
}