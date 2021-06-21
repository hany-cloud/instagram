// Styles
import styled, { css } from "styled-components";
import tw from "twin.macro";

// Components
import Button from "../components/button";

export const ContentWrapper = styled.div`
    ${tw` 
        flex 
        items-center 
        justify-center  
        content-center
            
        mx-auto  

        pr-3

        max-w-screen-md 
        h-screen    
    `}
`;

export const SideImageWrapper = styled.div`
    ${tw` 
        w-3/5       
    `}
`;

export const FormWrapper = styled.div`
    ${tw` 
        w-2/5     
    `}
`;

export const SectionFormWrapper = styled.div`
    ${tw`    
        flex 

        flex-col
        items-center 
        justify-center 
        
        w-full 
        
        bg-white 
        
        p-4 
        
        border border-gray-primary  

        rounded 
        
        mb-4
    `}
`;
export const TopSectionFormWrapper = styled(SectionFormWrapper)``;
export const TopSectionFormImage = styled.div`
    ${tw`    
        flex 
        justify-center 
        w-full
    `}

    & > img {
        ${tw`
            mt-2
            w-6/12 
            mb-4
        `};
      }
`;

export const BottomSectionFormWrapper = styled(SectionFormWrapper)``;

export const BottomSectionFormText = styled.p`
    ${tw`    
        text-sm
    `}

    & > a {
        ${tw`    
            font-bold 
            text-blue-medium
        `}  
    }
`;
  

export const FormError = styled.p`
    ${tw`    
        mb-4 
        text-xs 
        text-red-primary
    `}    
`;

export const FormInput = styled.input`
    ${tw`    
        text-sm 
        text-gray-base 

        w-full 

        mr-3 
        mb-2

        py-5 
        px-4 

        h-2 
        border border-gray-primary 
        rounded         
    `}
`;

export const FormButton = styled(Button)`
    ${tw`            
        w-full 
        h-8
        text-base
        pt-0.5                                      
    `};

    ${({ isInvalid }) =>
        isInvalid &&
        css`
            ${tw`
                opacity-50
            `};
        `};
`;