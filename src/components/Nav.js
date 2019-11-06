import React from 'react';
import { Redirect } from 'react-router-dom'

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  onSearchClick = () => {
      this.setState({ searching: true })
  }

  renderRedirect = () => {
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
