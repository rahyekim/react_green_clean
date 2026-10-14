import styled,{css} from "styled-components";


const getStatusTheme = (status?: string) => {
    switch (status?.toUpperCase()) {
        case 'PASS':
        case 'RUNNING':
            return {
                border: '#22c55e', 
            };
        case 'FAIL':
        case 'DANGER':
        case 'STOPPED':
            return {
                border: '#ef4444', 
            };
        case 'WARNING':
        case 'MAINTENANCE':
            return {
                border: '#fbbf24',
            };
        default:
            return {
               border: '#cbd5e1',
            };
    }
};

//process
export const LineCard = styled.div<{$status?:string;}>`
padding: 1.2rem;
border: 1px solid #e2e8f0;
border-radius: 0.75rem; //12px;
background: #fff;
box-shadow: 0 2px 4px rgba(0,0,0,0.02);

display: flex;
flex-direction: column;
gap: 0.8rem; 

border-left: 5px solid ${({ $status }) => getStatusTheme($status).border}; 

`;

export const CardHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`;

export const CardBody = styled.div`
    font-size: 0.9rem;
    color: #4b5563;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    letter-spacing: 0.03em;
    margin-bottom: 0.5rem;
`;

export const LineGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
  gap: 15px;
`;

const getStatusColor = (status?: string) => {
    switch (status?.toUpperCase()) {
        case 'PASS':
        case 'RUNNING': 
            return { bg: '#d1fae5', text: '#065f46' }; 
        case 'FAIL':
        case 'DANGER':
        case 'STOPPED': 
            return { bg: '#fee2e2', text: '#991b1b' }; 
        case 'MAINTENANCE': 
            return { bg: '#fef3c7', text: '#d97706' }; 
        case 'WARNING': 
            return { bg: '#fef3c7', text: '#b45309' }; 
        default: 
            return { bg: '#f3f4f6', text: '#374151' }; 
    }
}; 
export const StatusBadge =styled.span<{$status?:string}>`
padding: 0.25rem 0.6rem;
font-size: 0.75rem;
font-weight: bold;
border-radius: 9999px; //알약모양
color: ${({$status})=> getStatusColor($status).text};
background-color: ${({$status})=> getStatusColor($status).bg};
`;

export const ButtonGroup= styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
gap: 10px;
`;

export const ErrorText= styled.span`
color: ${p=>p.theme.colors.error};
font-weight: bold;
`;


export const QualiCard = styled.div<{$status?: string;}>`
width:230px;
max-width:230px;
padding:.9rem;
border:1px solid #ddd;
border-radius: .5rem;
padding: 1.2rem;
border-radius: 0.75rem; 
box-shadow: 0 2px 4px rgba(0,0,0,0.02);
display: flex;
flex-direction: column;
gap: 0.8rem; 

border-left: 5px solid ${({ $status }) => getStatusTheme($status).border}; /* 왼쪽 포인트 라인도 통일감 있게! */


   
`;


// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;