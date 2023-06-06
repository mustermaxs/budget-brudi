import "./PercentageBubble.css"

function PercentageBubble({value})
{
    return (
        <>
            <div className="percentageBubble">
                <span>{value}%</span>
            </div>
        </>
    )
}

export default PercentageBubble;