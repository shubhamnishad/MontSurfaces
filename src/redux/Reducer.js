import {RESET_ARRAY, SEARCH_BY_SPEED, SEARCH_PLANS} from './Action';

const initialState = {
  plans: [
    {id: 1, price: '100', speed: '20 Mbps', validity: '30 Days', enable: false},
    {id: 2, price: '300', speed: '30 Mbps', validity: '1 Month', enable: false},
    {id: 3, price: '500', speed: '40 Mbps', validity: '3 Month', enable: false},
    {id: 4, price: '700', speed: '60 Mbps', validity: '4 Month', enable: false},
    {id: 5, price: '800', speed: '80 Mbps', validity: '5 Month', enable: false},
    {
      id: 6,
      price: '1000',
      speed: '100 Mbps',
      validity: '1 Year',
      enable: false,
    },
    {
      id: 7,
      price: '1500',
      speed: '200 Mbps',
      validity: '2 Year',
      enable: false,
    },
  ],
  filterd_array: [],
};

const infoReducer = (istate = initialState, action) => {
  switch (action.type) {
    case SEARCH_PLANS:
      const searchQuery = action.payload.searchQuery.toLowerCase();
      let filterd = istate.plans.filter(
        x =>
          x.price.toLowerCase() === searchQuery ||
          x.speed.toLowerCase() === searchQuery ||
          x.validity.toLowerCase() === searchQuery,
      );
      return {...istate, filterd_array: filterd};
    case SEARCH_BY_SPEED:
      const speed = action.payload.speed.toLowerCase();
      let filterdBySpeed = istate.plans.filter(
        x => x.speed.toLowerCase() === speed,
      );
      return {...istate, filterd_array: filterdBySpeed};
    case RESET_ARRAY:
      console.log('Called');
      return {...istate, filterd_array: action.payload.ogArray};
    default:
      return istate;
  }
};

export default infoReducer;

// const filterd = istate.plans.filter(
//   x =>
//     x.price === action.payload ||
//     x.speed === action.payload ||
//     x.validity === action.payload,
// );
// return {...istate, plans: filterd};
