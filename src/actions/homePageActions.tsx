import { fetchHomePageDetails as fetchHomePageDetailsApi } from '../Utilities/ApiHandler'; // Import your API function
import { Dispatch } from 'redux';
import {
  HOME_PAGE_DETAILS_REQUEST,
  HOME_PAGE_DETAILS_SUCCESS,
  HOME_PAGE_DETAILS_FAILURE
} from '../Constants/reduxConstants';

// Action creators
export const homePageDetailsRequest = () => ({
  type: HOME_PAGE_DETAILS_REQUEST as typeof HOME_PAGE_DETAILS_REQUEST,
});

export const homePageDetailsSuccess = (data: any) => ({
  type: HOME_PAGE_DETAILS_SUCCESS as typeof HOME_PAGE_DETAILS_SUCCESS,
  payload: data,
});

export const homePageDetailsFailure = (error: string) => ({
  type: HOME_PAGE_DETAILS_FAILURE as typeof HOME_PAGE_DETAILS_FAILURE,
  payload: error,
});

// Thunk function
export const fetchHomePageDetails = (sessionId: string) => async (dispatch: Dispatch) => {
  dispatch(homePageDetailsRequest());
  try {
    const response = await fetchHomePageDetailsApi(sessionId);
    dispatch(homePageDetailsSuccess(response.data));
  } catch (error) {
    dispatch(homePageDetailsFailure((error as Error).message));
  }
};
