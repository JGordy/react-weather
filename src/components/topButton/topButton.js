import React, { Component } from 'react';
import { TiArrowUp } from 'react-icons/lib/ti';
import './topButton.css';
import utils from '../../utilities/utils';

export default class TopButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonShown: false
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.showButton);
  }

  componentShouldUnmount() {
    window.addEventListener('scroll', this.showButton);
  };

  showButton = () => {
    if (document.body.scrollTop > 550 || document.documentElement.scrollTop > 550) {
      this.setState({buttonShown: true});
    } else {
      this.setState({buttonShown: false});
    }
  }

  render() {
    return (
      <div onClick={() => utils.scrollTo('Top')} className={this.state.buttonShown ? 'TopButton shown' : 'TopButton'}>
        <TiArrowUp />
      </div>
    )
  }
}
