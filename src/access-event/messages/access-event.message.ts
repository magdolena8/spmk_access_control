export class AccessEventMessage {
  constructor(
    public id: string,
    public accessPoint: string,
    public cardCode: number,
    public diretion: 'IN' | 'OUT',
    public dateTime: string,
  ) {}
}
