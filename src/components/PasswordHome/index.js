import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'
import PasswordInstance from '../PasswordInstance'

const colorHexCodes = ['#0b69ff', '#94a3b8', '#b6c3ca']

class PasswordHome extends Component {
  state = {
    url: '',
    username: '',
    password: '',
    isPasswordChecked: false,
    passwordManager: [],
  }

  onDelete = id => {
    const {passwordManager} = this.state
    const filteredPasswordManager = passwordManager.filter(
      each => each.id !== id,
    )

    this.setState({
      passwordManager: filteredPasswordManager,
    })
  }

  urlInput = event => {
    this.setState({url: event.target.value})
  }

  usernameInput = event => {
    this.setState({username: event.target.value})
  }

  passwordInput = event => {
    this.setState({password: event.target.value})
  }

  onSubmit = event => {
    event.preventDefault()
    const {url, username, password} = this.state

    const newPassword = {
      id: v4(),
      website: url,
      inputUsername: username,
      userPassword: password,
    }

    this.setState(prevState => ({
      passwordManager: [...prevState.passwordManager, newPassword],
      url: '',
      username: '',
      password: '',
    }))
  }

  onToggleCheck = () => {
    this.setState(prevState => ({
      isPasswordChecked: !prevState.isPasswordChecked,
    }))
  }

  passwordInputManager = () => {
    const {url, username, password} = this.state

    return (
      <form className="form-container">
        <h1 className="form-title"> Add New Password </h1>
        <div className="input-element">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
            alt="website"
            className="input-image"
          />
          <input
            type="text"
            className="input"
            value={url}
            placeholder="Enter Website"
            onChange={this.urlInput}
          />
        </div>
        <div className="input-element">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
            alt="username"
            className="input-image"
          />
          <input
            type="text"
            className="input"
            value={username}
            placeholder="Enter Username"
            onChange={this.usernameInput}
          />
        </div>
        <div className="input-element">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
            alt="password"
            className="input-image"
          />
          <input
            type="password"
            className="input"
            value={password}
            placeholder="Enter Password"
            onChange={this.passwordInput}
          />
        </div>
        <button className="submit-btn" type="submit" onClick={this.onSubmit}>
          Add
        </button>
      </form>
    )
  }

  onChangeSearchInput = event => {
    const search = event.target.value
    const {passwordManager} = this.state

    const filteredPasswordManager = passwordManager.filter(each =>
      each.website.toLowerCase().includes(search.toLowerCase()),
    )

    this.setState({
      passwordManager: filteredPasswordManager,
    })
  }

  render() {
    const {passwordManager, isPasswordChecked} = this.state
    const lenOfPasswordManager = passwordManager.length

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="image-1"
          alt="app logo"
        />
        <div className="upper-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            className="image-2-sm"
            alt="password manager"
          />
          <div className="input-password-container">
            {this.passwordInputManager()}
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="image-2-lg"
            alt="password manager"
          />
        </div>
        <div className="lower-container">
          <div className="lower-container-header">
            <div className="heading-container">
              <h1 className="heading">Your Passwords</h1>
              <p className="count"> {lenOfPasswordManager}</p>
            </div>
            <div className="search-conatiner">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="input-image"
              />
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="show-passwords-container">
            <input
              type="checkbox"
              onChange={this.onToggleCheck}
              value={isPasswordChecked}
              id="checkbox"
            />
            <label className="label-heading" htmlFor="checkbox">
              Show Passwords
            </label>
          </div>
          {passwordManager.length === 0 && (
            <div className="empty-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="nopasswords-image"
              />
              <p className="heading"> No Passwords </p>
            </div>
          )}
          {passwordManager.length !== 0 && (
            <ul className="unordered-list-container">
              {passwordManager.map(each => (
                <PasswordInstance
                  instatnceDetails={each}
                  key={each.id}
                  colorHexCodes={colorHexCodes}
                  isPasswordChecked={isPasswordChecked}
                  onDelete={this.onDelete}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordHome
