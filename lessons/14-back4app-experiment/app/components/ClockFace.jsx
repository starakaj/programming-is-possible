const React = require("react");

function ClockFace(props) {

    const [date, setDate] = React.useState(new Date());

    // This will be called whenever the component renders, but because we pass an empty
    // array as the second argument, it will only be called once, when the component
    // first renders.
    React.useEffect(() => {

        const timerId = setInterval(() => {
            setDate(new Date);
        }, 1000);

        // By returning a function from useEffect, we tell React that we'd like this
        // function called when the component is unmounted
        return () => { clearInterval(timerId) };

    }, []);

    let prefix = "";
    let postfix = ""
    if (props.language === "en") {
        prefix = "It is";
        postfix = "o'clock";
    } else if (props.language === "fr") {
        prefix = "Il est";
        postfix = "heures";
    }

    return (
        <p>{prefix} {date.getHours()}:{date.getMinutes()}:{date.getSeconds()} {postfix}</p>
    );
}

module.exports = ClockFace;