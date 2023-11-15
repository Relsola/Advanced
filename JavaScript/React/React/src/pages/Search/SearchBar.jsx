export default ({
    filterText,
    inStockOnly,
    onFilterTextChange,
    onInStockOnlyChange
}) => (
    <form>
        <input
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={e => { onFilterTextChange(e.target.value) }}
        />
        <br />
        <input
            type="checkbox"
            value={inStockOnly}
            onChange={e => { onInStockOnlyChange(e.target.checked) }}
        />
        Only show products in stock
    </form>
);