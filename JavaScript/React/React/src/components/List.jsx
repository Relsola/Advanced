const products = [
    { title: 'Cabbage', isFruit: false, id: 1 },
    { title: 'Garlic', isFruit: false, id: 2 },
    { title: 'Apple', isFruit: true, id: 3 },
];

const listItems = products.map(item =>
    <li
        key={item.id}
        style={
            { color: item.isFruit ? 'magenta' : 'white' }
        }
    >
        {item.title}
    </li>
);

export default () => <ul>{listItems}</ul>
