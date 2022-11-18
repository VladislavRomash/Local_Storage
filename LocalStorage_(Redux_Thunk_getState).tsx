// Store

const rootReducer = combineReducers({
    counter: CounterReducer
})

export type StateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

// App

function App() {

    const value = useSelector<StateType, number>(state => state.counter['value'])
    const dispatch = useDispatch()

    const onClickHandler = () => {
        // @ts-ignore
        dispatch(incValuesTC())
    }

    useEffect(() => {
        // @ts-ignore
        dispatch(setValuesFromLSTC())
    }, [])

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

type ActionType = SetValueFromLocalStorageType
    | IncrementType

export const CounterReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'INCREASE':
            return {
                ...state, value: state.value + 1
            }
        case 'SET':
            return {
                ...state, value: action.value
            }
        default:
            return state;
    }
}

type IncrementType = ReturnType<typeof incValuesAC>
export const incValuesAC = () => {
    return ({type: 'INCREASE'} as const)
}

type SetValueFromLocalStorageType = ReturnType<typeof setValueFromLocalStorageAC>
export const setValueFromLocalStorageAC = (value: number) => {
    return ({type: 'SET', value} as const)
}

// THUNK

export const incValuesTC = () => (dispatch: Dispatch, getState: () => StateType) => {
    let currentValue = getState().counter.value
    localStorage.setItem('counterValue', JSON.stringify(currentValue + 1))
    dispatch(incValuesAC())
}

export const setValuesFromLSTC = () => (dispatch: Dispatch) => {
    let valuesAsString = localStorage.getItem('counterValue')
    if (valuesAsString) {
        dispatch(setValueFromLocalStorageAC(JSON.parse(valuesAsString)))
    }
}

