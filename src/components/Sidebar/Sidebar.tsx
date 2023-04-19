import { PropsWithChildren } from 'react';
import { 
    StyledSidebar, 
    StyledHead, 
    StyledBody,
    StyledHeadIcon,
    StyledHorizontal,
} from './style';
import { FaSpider } from 'react-icons/fa';

interface ISidebar {
    title?: string,
}

const Sidebar = (props: PropsWithChildren<ISidebar>) => {
    const { title, children } = props;

    return (
        <StyledSidebar>
            <StyledHead>
                <StyledHeadIcon>
                    <FaSpider size={25} color="#42424a"/>
                </StyledHeadIcon>
                {title}
            </StyledHead>
            <StyledHorizontal />
            <StyledBody>
                {children}
            </StyledBody>
        </StyledSidebar>
    )
}

export default Sidebar;