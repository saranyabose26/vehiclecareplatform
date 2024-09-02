import PropTypes from 'prop-types';

const Message = ({ varient, children }) => {
	const getVarientClass = () => {
		switch (varient) {
			case "success":
				return "bg-green-100 text-green-800";
			case "error":
				return "bg-red-100 text-red-800";
			default:
				return "bg-blue-100 text-blue-800";
		}
	};

	return (
		<div className={`p-4 ${getVarientClass()} w-full mx-auto`}>
			{children ? children : "No message"}
		</div>
	);
};

// Define prop types for the Message component
Message.propTypes = {
	varient: PropTypes.oneOf(["success", "error"]),  // Valid values are "success" or "error"
	children: PropTypes.node,  // Can be any renderable content
};

export default Message;
