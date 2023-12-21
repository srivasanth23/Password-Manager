import './index.css'

const PasswordInstance = props => {
  const {instatnceDetails, onDelete, colorHexCodes, isPasswordChecked} = props
  const {id, userPassword, inputUsername, website} = instatnceDetails

  const randomIndex = Math.ceil(Math.random() * colorHexCodes.length - 1)
  const pp = website[0]
  const onDeleteButton = () => {
    onDelete(id)
  }

  return (
    <li className="list-container">
      <div
        className="pp"
        style={{backgroundColor: `${colorHexCodes[randomIndex]}`}}
      >
        <p className="profile-pic"> {pp} </p>
      </div>
      <div className="info-container">
        <p className="website-name">{website}</p>
        <p className="username">{inputUsername}</p>
        {!isPasswordChecked && (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars-image"
          />
        )}
        {isPasswordChecked && <p className="password"> {userPassword}</p>}
      </div>
      <div className="delete-container">
        <button
          type="button"
          className="delete-button"
          onClick={onDeleteButton}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordInstance
