import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchCardList: ['filter'],
  fetchCardListLoading: null,
  fetchCardListSuccess: ['cardList'],
  fetchCardListFailure: ['errorMessage']
});

export const CardListTypes = Types;
export default Creators;
