import PropTypes from 'prop-types';

// Styles
import styled, { css } from "styled-components";
import tw from "twin.macro";

const BaseButton = styled.button`
    ${tw`
        font-bold
        text-sm 
        
        p-2
        
        rounded
    `};

    ${({ xsmall }) =>
        xsmall &&
        css`
        ${tw`
            text-xs
        `}; 
        
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

export default function Button({ theme, text, className, onClick, onKeyDown, type, xsmall }) {    
    if (theme === ButtonTheme.filled)
        return <FilledButton className={className} 
                    onClick={onClick} onKeyDown={onKeyDown} 
                    type={type} xsmall={xsmall}>{text}</FilledButton>;

    else return <LinkButton className={className} 
                    onClick={onClick} onKeyDown={onKeyDown} 
                    type={type} xsmall={xsmall}>{text}</LinkButton>;
}

Button.propTypes = {
    theme: PropTypes.oneOf(['filled', 'link']),
    text: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func, 
    type: PropTypes.string
};