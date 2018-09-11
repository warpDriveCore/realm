export const GET_DASHBOADR = 'miner/GET_DASHBOADR';
export const GET_DASHBOADR_SUCCESS = 'miner/GET_DASHBOADR_SUCCESS';
export const GET_DASHBOADR_FAIL = 'miner/GET_DASHBOADR_FAIL';

export const GET_RIGS = 'miner/GET_RIGS';
export const GET_RIGS_SUCCESS = 'miner/GET_RIGS_SUCCESS';
export const GET_RIGS_FAIL = 'miner/GET_RIGS_FAIL';

export const GET_LISTING = 'crypto/GET_LISTING';
export const GET_LISTING_SUCCESS = 'crypto/GET_LISTING_SUCCESS';
export const GET_LISTING_FAIL = 'crypto/GET_LISTING_FAIL';

export const GET_PORTFOLIO = 'crypto/GET_PORTFOLIO';
export const GET_PORTFOLIO_SUCCESS = 'crypto/GET_PORTFOLIO_SUCCESS';
export const GET_PORTFOLIO_FAIL = 'crypto/GET_PORTFOLIO_FAIL';

const initialState = {
  farm: {
    rigs: [],
    isLoading: true,
    failedToLoad: false,
  },
  dashboard: {
    data: {
      workers: [],
      statistics: [],
    },
    isLoading: true,
    failedToLoad: false,
  },
  portfolio: {
    coins: [],
    isloading: true,
    failedToLoad: false,
  },
  marketcup: {
    listing: [],
    isloading: true,
    failedToLoad: false,
  },
}

export default function reducer(state = initialState, action) {
  switch(action.type) {

    case GET_RIGS: return state
    case GET_RIGS_SUCCESS: return { 
      ...state, 
      farm: { 
        rigs: action.payload.data, 
        isLoading: false 
      } 
    }
    case GET_RIGS_FAIL: return { ...state, ...farm }
    
    case GET_DASHBOADR: return state
    case GET_DASHBOADR_SUCCESS: return { ...state, dashboard: { data: action.payload.data, isLoading: false } }
    case GET_DASHBOADR_FAIL: return { ...state, dashboard:  { ...dashboard.data, isLoading: false, failedToLoad: true } }
    
    case GET_PORTFOLIO: return state
    case GET_PORTFOLIO_SUCCESS: return { 
      ...state, 
      portfolio: { 
        coins : action.payload.data, 
        isLoading: false 
      }
    }
    case GET_PORTFOLIO_FAIL: return {
      ...state, 
      portfolio: { 
        coins : [], 
        isLoading: false,
        failedToLoad: true 
      }
    }

    case GET_LISTING: return state
    case GET_LISTING_SUCCESS: return { 
      ...state, 
      marketcup: {
        listing: action.payload.data,
        isLoading: false,
      }  }
    case GET_LISTING_FAIL: return { 
      ...state,
      marketcup: {
        listing: [],
        isloading: false,
        failedToLoad: true,
      }
    }

    default: return state;
  }
}

export function fetchDashboard() {
  return {
    type: GET_DASHBOADR,
    payload: {
      request: {
        url: '/dashboard'   
      }
    }
  }
}

export function fetchRigs() {
  return {
    type: GET_RIGS,
    payload: {
      request: {
        url: '/farms' 
      }  
    }
  }
}

export function fetchPortfolio() {
  return {
    type: GET_PORTFOLIO,
    payload: {
      request: {
        url: '/portfolio'           
      }  
    }
  }
}

export function fetchCryproLising() {
  return {
    type: GET_LISTING,
    payload: {
      request: {
        url: '/listing'   
      }
    }
  }
}
