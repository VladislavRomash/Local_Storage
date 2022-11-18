// Store

const rootReducer = combineReducers({
    counter: CounterReducer
})

let preloadedState;
const persistedString = localStorage.getItem('appState')
if (persistedString) {
    preloadedState = JSON.parse(persistedString)
}

export type StateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, preloadedState)


store.subscribe(() => {
    localStorage.setItem('appState', JSON.stringify(store.getState()))
})

// App

function App() {

    const value = useSelector<StateType, number>(state => state.counter['value'])
    const dispatch = useDispatch()

    const onClickHandler = () => {
        dispatch(incValuesAC())
    }

    return (
        <div className="App">
            <h1>{value}</h1>
            <button onClick={onClickHandler}>inc</button>
        </div>
    );
}

export default App;

// CounterReducer

const initialState = {
    value: 0
}

type InitialStateType = typeof initialState

export const CounterReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'INCREASE':
            return {
                ...state, value: state.value + 1
            }
        default:
            return state;
    }
}

type ActionType = ReturnType<typeof incValuesAC>
export const incValuesAC = () => {
    return ({type: 'INCREASE'} as const)
}