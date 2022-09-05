export class PaginatedResponse<T> {
  constructor(public total: number, public items: T[]) {}
}
