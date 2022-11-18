// Store

const rootReducer = combineReducers({
    counter: CounterReducer
})


export type StateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, loadState())


store.subscribe(() => {
    saveState({
        counter: store.getState().counter
    })
    localStorage.setItem('appState', JSON.stringify(store.getState()))
})

// LocalStorage

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('appState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};


export const saveState = (state: StateType) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('appState', serializedState);
    } catch {
        // ignore write errors
    }
};

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