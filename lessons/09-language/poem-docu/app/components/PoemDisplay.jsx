const React = require("react");

module.exports = function(props) {
    const [poem, setPoem] = React.useState([]);

    React.useEffect(() => {
        fetch("/poem")
            .then(result => result.json())
            .then(lines => setPoem(lines));
    }, []);

    const lineElts = poem.map((line, i) => <li key={i}>{line}</li>);

    return (<ul>{lineElts}</ul>);
}