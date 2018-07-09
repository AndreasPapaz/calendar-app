import { FETCH_DATE } from '../actions/index';

export default function(state = [], action) {
	switch (action.type) {
		case FETCH_DATE:
			// return state.concat([action.payload.data]); //same as below
			// we dont manipulate state with .push, this is why we add with .concat
			return [ action.payload.data, ...state ];
			break;

	}
	return state;
}
