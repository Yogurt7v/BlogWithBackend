import PropTypes from "prop-types"; 
import styled from "styled-components";


const ButtonContainer = ({children, className, width, ...props }) => {
    return (
        <button className={className} {...props}>
            {children}
        </button>
    )
}


export const Button = styled(ButtonContainer)`
    width: ${({width = "100%"}) => width};
    height: 30px;
    cursor: pointer;
    background-color: #e6baa3;
    border: none;
    border-radius: 5px;
    color: black;
    font-size: 12px;
    font-weight: 700;

    &:hover {
        background-color: #A64439;
    }
}
`;

export default Button

Button.propTypes ={
    children: PropTypes.node.isRequired, 
    width: PropTypes.string, 
}