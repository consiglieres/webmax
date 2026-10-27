export interface IStandInterface {
  id: string,
  name: string,
  type: string,
  address: string
}

export interface IStend {
  poolId: number | string,
  name: string,
  description: string,
  nets: string[],
  permissions: string[],
  interfaces?: IStandInterface[]
}
