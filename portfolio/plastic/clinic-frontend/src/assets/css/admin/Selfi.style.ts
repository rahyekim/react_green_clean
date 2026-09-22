import styled from "styled-components";
import {
    FlexCenter, TransitionAll,FlexColumn,BoxShadow2
}from '@/assets/css/Common.style'

export const SelfContainer = styled.div`
    width: 100%;
    min-height: 100%;
`;

export const SelfPageHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
`;

export const SelfPageTitle = styled.h1`
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: #333;
`;

export const SelfSaveButton = styled.button`
    ${FlexCenter}
    gap: 8px;
    padding: 10px 16px;
    border: 0;
    border-radius: 8px;
    background-color: #4e73df;
    color: #fff;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;

    ${TransitionAll}

    &:hover {
        background-color: #2e59d9;
    }
`;

export const SelfGrid = styled.div`
    display: grid;
    grid-template-columns: 2fr 3fr;
    gap: 16px;
    align-items: stretch;
`;

export const SelfLeftColumn = styled.div`
    ${FlexColumn}
    width: 100%;
    min-width: 0;
`;

export const SelfRightColumn = styled.div`
    ${FlexColumn}
    width: 100%;
    min-width: 0;
`;

export const SelfCard = styled.div`
    width: 100%;
    height: 100%;

    border-radius: 10px;
    background-color: #fff;
    border: 1px solid #e3e6f0;

    ${BoxShadow2}

    overflow: hidden;

    display: flex;
    flex-direction: column;
`;

export const SelfCardHeader = styled.div`
    background-color: #f8f9fc;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid #e3e6f0;
`;

export const SelfCardTitle = styled.h2`
    margin: 0;
    font-weight: 700;
    font-size: 1rem;
    color: #4e73df;
`;

export const SelfCardBody = styled.div`
    flex: 1;

    color: #858796;
    padding: 1.5rem;

    display: flex;
    flex-direction: column;
    gap: 30px;

    min-height: 0; ///??
`;

export const SelfFormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const SelfLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 6px;

    font-size: 0.9rem;
    font-weight: 600;
    color: #5a5c69;
`;

export const SelfInput = styled.input`
    width: 100%;
    box-sizing: border-box;

    padding: 10px 12px;

    border: 1px solid #d1d3e2;
    border-radius: 8px;

    background-color: #fff;
    color: #5a5c69;

    font-size: 0.9rem;

    outline: none;

    &:focus {
        border-color: #4e73df;
        box-shadow: 0 0 0 3px rgba(78, 115, 223, 0.1);
    }
`;

export const SelfFileInputWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    width: 100%;
    flex-wrap: wrap;

    .file-name {
        flex: 1; //???
        min-width: 0;

        font-size: 0.9rem;
        color: #858796;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export const SelfFileInput = styled.input`
    display: none;
`;

export const SelfFileLabel = styled.label`
    ${FlexCenter}
    gap: 8px;

    padding: 12px 18px;

    border: 1px solid #e3e6f0;
    border-radius: 8px;

    background-color: #fff;
    color: #5a5c69;

    font-size: 0.9rem;
    white-space: nowrap;

    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

    cursor: pointer;

    ${TransitionAll}

    &:hover {
        background-color: rgba(78, 115, 223, 0.04);
        border-color: #b7b9cc;
        color: #212529;
    }
`;

export const SelfPreviewRect = styled.div`
    ${FlexCenter}

    width: 180px;
    height: 240px;

    margin: 4px auto 0;

    overflow: hidden;

    border-radius: 10px;
    border: 2px solid #e3e6f0;

    background-color: #f8f9fc;

    flex-shrink: 0;

    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const SelfAddButton = styled.button`
    ${FlexCenter}
    gap: 8px;

    width: 100%;

    margin-top: auto;
    padding: 12px 16px;

    border: 0;
    border-radius: 8px;

    background-color: #4e73df;
    color: #fff;

    font-size: 0.9rem;
    font-weight: 600;

    cursor: pointer;

    ${TransitionAll}

    &:hover {
        background-color: #2e59d9;
    }
`;

export const SelfTableWrapper = styled.div`
    width: 100%;
    max-height: 600px;

    overflow-y: auto;

    scrollbar-width: thin;
`;

export const SelfTable = styled.table`
    table-layout: fixed;
    border-collapse: collapse;

    width: 95%;
    margin: 0 auto;

    text-align: center;
    font-size: 0.9rem;

    color: #333;

    th,
    td {
        padding: 1rem 0.8rem;

        vertical-align: middle;
        text-align: center;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        min-width: 0;
    }

    th {
        position: sticky;
        top: 0;
        z-index: 1;

        padding: 15px;

        background-color: #ebf3f9;
        border-bottom: 1px solid #e3e6f0;
    }

    td {
        color: #555;
        padding: 1rem;

        border-bottom: 1px solid #f1f3f9;
    }

    tr:nth-child(even) {
        background-color: #f8f9fc;
    }
`;

export const SelfThumbnail = styled.div`
    ${FlexCenter}

    width: 70px;
    height: 90px;

    margin: 0 auto;

    overflow: hidden;

    border-radius: 8px;
    border: 1px solid #e3e6f0;
    background-color: #f8f9fc;

    flex-shrink: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    span {
        font-size: 0.75rem;
        color: #858796;
    }
`;

export const SelfStatusBadge = styled.button<{ $isActive: boolean }>`
    padding: 6px 10px;

    border: 0;
    border-radius: 20px;

    background-color: ${({ $isActive }) =>
        $isActive ? '#e8f5e9' : '#f1f3f9'};

    color: ${({ $isActive }) =>
        $isActive ? '#2e7d32' : '#858796'};

    font-size: 0.8rem;
    font-weight: 600;

    cursor: pointer;

    ${TransitionAll}

    &:hover {
        opacity: 0.8;
    }
`;

export const SelfDeleteBtn = styled.button`
    ${FlexCenter}

    width: 34px;
    height: 34px;

    margin: 0 auto;

    border: 0;
    border-radius: 6px;

    background-color: #fff0f0;
    color: #e74a3b;

    cursor: pointer;

    ${TransitionAll}

    &:hover {
        background-color: #e74a3b;
        color: #fff;
    }
`;
