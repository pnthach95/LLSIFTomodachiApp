/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { CardListTypes } from './Actions'

export const fetchCardListLoading = (state) =>
  state.merge({
    cardListIsLoading: true,
    cardListErrorMessage: '',
  })

export const fetchCardListSuccess = (state, { cardList }) =>
  state.merge({
    cardList: cardList,
    cardListIsLoading: false,
    cardListErrorMessage: null,
  })

export const fetchCardListFailure = (state, { errorMessage }) =>
  state.merge({
    cardList: null,
    cardListIsLoading: false,
    cardListErrorMessage: errorMessage,
  })

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [CardListTypes.FETCH_CARD_LIST_LOADING]: fetchCardListLoading,
  [CardListTypes.FETCH_CARD_LIST_SUCCESS]: fetchCardListSuccess,
  [CardListTypes.FETCH_CARD_LIST_FAILURE]: fetchCardListFailure,
})
