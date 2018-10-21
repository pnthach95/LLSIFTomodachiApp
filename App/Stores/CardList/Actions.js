import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchCardList: null,
  fetchCardListLoading: null,
  fetchCardListSuccess: ['cardList'],
  fetchCardListFailure: ['errorMessage'],
})

export const CardListTypes = Types
export default Creators
