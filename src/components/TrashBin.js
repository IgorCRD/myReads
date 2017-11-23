import React from 'react'
import PropTypes from 'prop-types'

const TrashBin = (props) => {
  return (
    <ol ref={ props.trashBinRef } data-shelfType='none' className="trash-bin">
    </ol>
  );
};

TrashBin.propTypes = {
  trashBinRef: PropTypes.func.isRequired,
};

TrashBin.isTrashBinContainer = (trashBinContainer) => {
  return trashBinContainer.getAttribute('data-shelftype') === 'none';
};

export default TrashBin