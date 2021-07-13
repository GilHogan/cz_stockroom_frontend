import { createStore, createLogger } from 'vuex'

import { appModule, AppStore, AppState } from '@/store/modules/app'
import { StockroomState, StockroomStore, StockroomModule } from '@/store/modules/stockroom'
import { HouseTypeState, HouseTypeStore, HouseTypeModule } from '@/store/modules/house-type'
import { PriceState, PriceStore, PriceModule } from '@/store/modules/price'
import { AreaState, AreaStore, AreaModule } from '@/store/modules/area'
import { DistrictState, DistrictStore, DistrictModule } from '@/store/modules/district'

export type RootState = {
  app: AppState;
  stockroom: StockroomState;
  houseType: HouseTypeState;
  price: PriceState;
  area: AreaState;
  district: DistrictState
};

const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger({})] : []

export type Store = AppStore<Pick<RootState, 'app'>> & StockroomStore<Pick<RootState, "stockroom">> & HouseTypeStore<Pick<RootState, "houseType">> &
  PriceStore<Pick<RootState, "price">> & AreaStore<Pick<RootState, "area">> & DistrictStore<Pick<RootState, "district">>;

export const store = createStore({
  plugins,
  modules: {
    app: appModule,
    stockroom: StockroomModule,
    houseType: HouseTypeModule,
    price: PriceModule,
    area: AreaModule,
    district: DistrictModule
  }
})

export function useStore (): Store {
  return store as Store;
}

export default store;
