import './style.css';

export default function Filters({ isFilters, setIsFilters, setDateStart, setDateEnd }) {
    const activeFilters = (state) => {
        setIsFilters(state);
    }

    return (
            <div className="filters">
                <p className='filters__title'>Фильтры:</p>
                <div className='filters__date'>
                    <label>От:</label>
                    <input onChange={(e) => setDateStart(new Date(e.target.value))} type="date" className='date date--start' />
                    <label>До:</label>
                    <input onChange={(e) => setDateEnd(new Date(e.target.value))} type="date" className='date date--end' />
                </div>
                {!isFilters ? <button onClick={() => activeFilters(true)} className="filters__button">Применить</button> :
                <button onClick={() => activeFilters(false)} className="filters__button">Сбросить</button>}
            </div >
    )
}
