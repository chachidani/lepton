
import PropTypes from 'prop-types';

const Navbar = ({search , handleSearch}) => {
  return (
    <>
    <div className="p-10 mx-auto flex items-center justify-center ">
       
      <input
        type="text"
        placeholder="Search posts..."
        className="border p-2 w-1/2 rounded h-16"
        value={search}
        onChange={handleSearch}

      /> 
    </div>
    </>
  )
}

Navbar.propTypes = {
  search: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default Navbar;
