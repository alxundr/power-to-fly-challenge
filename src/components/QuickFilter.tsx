const QuickFilter = (props: {
    label: string,
    onToggle: (checked: boolean) => void
}) => {

    const handleChecboxChange = (event: any) => {
        props.onToggle(event.target.checked)
    }
    return (
        <label>
            {props.label}
            <input type="checkbox" name={props.label} onChange={handleChecboxChange}/>
        </label>
    )
}

export default QuickFilter