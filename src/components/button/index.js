import PropTypes from 'prop-types';

// Styles
import styled from "styled-components";
import tw from "twin.macro";

const BaseButton = styled.button`
    ${tw`
        font-bold
        text-sm 
        
        p-2
        
        rounded
    `};
`;

const FilledButton = styled(BaseButton)`
    ${tw`            
        text-white 
        bg-blue-medium 
    `}
`;

const LinkButton = styled(BaseButton)`
    ${tw`            
        text-blue-medium                
    `}
`;

export const ButtonTheme = {
    filled: "filled",
    link: 'link'

}

export default function Button({ theme, text, className, onClick, onKeyDown, type, disabled }) {    
    if (theme === ButtonTheme.filled)
        return <FilledButton className={className} 
                    onClick={onClick} onKeyDown={onKeyDown} 
                    type={type} disabled={disabled}>{text}</FilledButton>;

    else return <LinkButton className={className} 
                    onClick={onClick} onKeyDown={onKeyDown} 
                    type={type} disabled={disabled}>{text}</LinkButton>;
}

Button.propTypes = {
    theme: PropTypes.oneOf(['filled', 'link']),
    text: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func, 
    type: PropTypes.string,
    disabled: PropTypes.bool
};