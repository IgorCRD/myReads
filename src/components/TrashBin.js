import React, { Component } from 'react'

class TrashBin extends Component {

  static isTrashBinContainer = (trashBinContainer) => {
    return trashBinContainer.getAttribute('data-shelftype') === 'none';
  }

  render() {
    return (
      <ol ref={ this.props.trashBinRef } data-shelfType='none' className="trash-bin">
      </ol>
    );
  }
}

export default TrashBin