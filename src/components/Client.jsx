import Avvvatars from "avvvatars-react"


const Client = ({ userName }) => {
  return (
    <div className="m-2">
        <Avvvatars value={userName} size={50} />
        <span> {userName} </span>
    </div>
  )
}

export default Client   