export type Status = {
  fetching?: boolean;
  refreshing?: boolean;
  creating?: boolean;
  updating?: boolean;
  removing?: boolean;
}

export type BaseState = {
  status: Status
};

export const baseState: BaseState = {
  status: {
    fetching: false,
    refreshing: false,
    creating: false,
    updating: false,
    removing: false
  }
};

export type StockroomItem = {
  area: number;
  daily_stock_room_id: number;
  date: string;
  id: number;
  number: number;
  type: number;
  update_at: string;
}
