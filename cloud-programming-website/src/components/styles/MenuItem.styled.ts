import styled from 'styled-components';

const StyledMenuItem = styled.li`
    padding: 8px 12px;
    cursor: pointer;
    transition: all 0.2s;
    border-radius: 10px;

    &:hover {
        background: rgba(0, 0, 0, 0.1);
    }

    a {
        text-decoration: none;
    }
`;

export default StyledMenuItem;
