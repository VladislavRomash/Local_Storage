function App() {

    const [value, setValue] = useState(() => {
        const saved = localStorage.getItem('counterValue');
        if (saved) {
            const initialValue = JSON.parse(saved);
            return initialValue || 0;
        }
    })

    useEffect(() => {
        localStorage.setItem('counterValue', JSON.stringify(value))
    }, [value])

    const onClickHandler = () => {
        setValue(value + 1)
    }

    return (
        <div className="App">
            <h1>{value}</h1>
            <button onClick={onClickHandler}>inc</button>
        </div>
    );
}

export default App;