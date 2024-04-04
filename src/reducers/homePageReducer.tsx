import {
  HOME_PAGE_DETAILS_REQUEST,
  HOME_PAGE_DETAILS_SUCCESS,
  HOME_PAGE_DETAILS_FAILURE
} from '../Constants/reduxConstants';
interface HomePageState {
  loading: boolean;
  data: any | null;
  error: string | null;
}

const initialState: HomePageState = {
  loading: false,
  data: null,
  error: null,
};

type HomePageAction =
  | { type: typeof HOME_PAGE_DETAILS_REQUEST }
  | { type: typeof HOME_PAGE_DETAILS_SUCCESS; payload: any }
  | { type: typeof HOME_PAGE_DETAILS_FAILURE; payload: string };

const homePageReducer = (state: HomePageState = initialState, action: HomePageAction): HomePageState => {
  switch (action.type) {
    case HOME_PAGE_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };
    case HOME_PAGE_DETAILS_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case HOME_PAGE_DETAILS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default homePageReducer;
