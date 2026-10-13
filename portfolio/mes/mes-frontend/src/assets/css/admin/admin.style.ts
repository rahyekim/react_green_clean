import styled,{css} from "styled-components";

//process
export const LineCard = styled.div<{$isWarning?:boolean}>`
padding: 1.2rem;
border: 1px solid #e5e7eb;
border-radius: 8px;
background: #fff;
box-shadow: 0 2px 4px rgba(0,0,0,0.02);

display: flex;
flex-direction: column;
gap: 0.8rem; 

${({ $isWarning }) => $isWarning && css`
    background-color: #fefce8;
    border: 1px solid #fefce8;
    border-left: 5px solid #fde047;
  `}
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
`;

export const LineGrid = styled.div`
  // 7열 그리드 레이아웃 껍데기
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
  gap: 8px;
`;
const getStatusColor = (status?: string) => {
    switch (status) {
        case 'RUNNING': 
            return { bg: '#d1fae5', text: '#065f46' }; 
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
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;