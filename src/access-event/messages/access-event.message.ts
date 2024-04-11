export class AccessEventMessage {
  constructor(
    public id: string,
    public accessPoint: string,
    public cardCode: number,
    public direction: 'IN' | 'OUT',
    public dateTime: string,
  ) {}
}
