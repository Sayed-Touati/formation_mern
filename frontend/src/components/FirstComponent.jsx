function FirstComponent(props) {
    const firstName = props.firstName;

    return (
        <h2>
            Hello {firstName}
        </h2>
    )
}

export default FirstComponent;