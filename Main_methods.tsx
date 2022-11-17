function App() {

    const [value, setValue] = useState<number>(0)

    const onClickHandler = () => {
        setValue(value + 1)
    }

    const setHandler = () => {
        localStorage.setItem('counterValue', JSON.stringify(value))
        localStorage.setItem('counterValue + 1', JSON.stringify(value + 1))
    }
    const getHandler = () => {
        const string = localStorage.getItem('counterValue')
        if (string) {
            setValue(JSON.parse(string))
        }
    }
    const clearHandler = () => {
        localStorage.clear()
        setValue(0)
    }
    const removeHandler = () => {
        localStorage.removeItem('counterValue')
    }

    return (
        <div className="App">
            <h1>{value}</h1>
            <button onClick={onClickHandler}>inc</button>
            <button onClick={setHandler}>set</button>
            <button onClick={getHandler}>get</button>
            <button onClick={clearHandler}>clear</button>
            <button onClick={removeHandler}>remove</button>

        </div>
    );
}

export default App;