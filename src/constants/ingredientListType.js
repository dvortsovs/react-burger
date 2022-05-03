import PropTypes from "prop-types";

const ingredientListType = PropTypes.shape({
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
})

export default ingredientListType