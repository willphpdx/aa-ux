import React from 'react';
import { Redirect } from 'react-router-dom'

class Nav extends React.Component {
  // It is ALWAYS important to pass the `props` 
  // in both the constructor invocation and the super invocation:
  // https://reactjs.org/docs/react-component.html#constructor
  constructor(props) {
    super(props);
    this.state = {}
  }
  onSearchClick = () => {
      // is this meant to set this.state.redirect = true?
      this.setState({ searching: true })
  }

  renderRedirect = () => {
    // or is this meant to be this.state.search instead of this.state.redirect?
    if (this.state.redirect) {
      return <Redirect to='/search' />
    }
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <ul>
          AudAud
        </ul>
      </div>
    )
  }
}

export default Nav;
