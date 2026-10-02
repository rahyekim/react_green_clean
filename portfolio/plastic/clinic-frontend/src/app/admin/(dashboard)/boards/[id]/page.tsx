"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import styled, { css } from "styled-components";
import { FiPlus, FiSearch, FiSettings, FiTrash2, FiFileText } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Ellipsis, Unselectable } from "@/assets/css/common/Common.style";

export interface BoardData {
    id: number;
    name: string;
    type: string;
    readAuth: string;
    writeAuth: string;
}

interface BackendBoardResponse {
    BOARD_IDX: number;
    NAME: string;
    BOARD_TYPE: string;
    READ_AUTH: string;
    WRITE_AUTH: string;
}

// 3. 특정 게시판 단건 조회 API (GET /api/boards/:idx)
export const getBoardDetail = async (boardIdx: string | number): Promise<BoardData | null> => {
    try {
        const response = await axios.get(`/api/boards/${boardIdx}`);
        
        if (response.data.success) {
            const raw: BackendBoardResponse = response.data.data;

            // 백엔드의 대문자 데이터를 프론트엔드의 카멜케이스로 매핑(변환)
            return {
                id: raw.BOARD_IDX,
                name: raw.NAME,
                type: raw.BOARD_TYPE,
                readAuth: raw.READ_AUTH,
                writeAuth: raw.WRITE_AUTH,
            };
        }
        return null;
    } catch (error) {
        console.error("게시판 단건 조회 실패:", error);
        return null;
    }
};
// 임시 게시글 타입 (나중에 게시글 API 만들 때 교체하면 됩니다)
interface PostItem {
    id: number;
    title: string;
    author: string;
    createdAt: string;
    views: number;
}

export default function BoardDetailPage() {
    const params = useParams();
    const router = useRouter();
    const boardIdx = params.id as string; 

    // 상태 관리
    const [boardInfo, setBoardInfo] = useState<BoardData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchKeyword, setSearchKeyword] = useState<string>("");

    // 임시 게시글 리스트 상태 (추후 백엔드 연동)
    const [posts, setPosts] = useState<PostItem[]>([
        { id: 3, title: "서비스 오픈 안내 및 이용 수칙 공지", author: "관리자", createdAt: "2026-06-01", views: 124 },
        { id: 2, title: "점검 시간 안내 (06/05 새벽 2시)", author: "관리자", createdAt: "2026-05-28", views: 89 },
        { id: 1, title: "베타 테스트 참여 안내 드립니다.", author: "운영자", createdAt: "2026-05-20", views: 230 },
    ]);

    // 게시판 상세 정보 로드
   // 🔄 URL의 [id] (boardIdx)가 바뀔 때마다 실행되는 구역!
    useEffect(() => {
        if (!boardIdx) return;

        const fetchBoardData = async () => {
            setIsLoading(true);

            // 1. 해당 게시판의 정보(이름, 권한 등) 가져오기
            const boardData = await getBoardDetail(boardIdx);
            if (boardData) {
                setBoardInfo(boardData);
            }else {
                setBoardInfo(null);
            }

            // 2. 💡 [중요] 게시판 번호(boardIdx)에 맞는 게시글 목록을 백엔드에서 가져오기
            // 예시: const postRes = await axios.get(`/api/posts?boardIdx=${boardIdx}`);
            // 지금은 백엔드 API가 아직 없으니, boardIdx에 따라 다르게 보이도록 가상으로 분기해둘게요!
            
            if (boardIdx === "1") {
                // 1번 게시판 (예: 공지사항) 글들
                setPosts([
                    { id: 101, title: "[공지] 서비스 정식 오픈 안내", author: "관리자", createdAt: "2026-06-01", views: 350 },
                    { id: 102, title: "[공지] 개인정보처리방침 개정 안내", author: "관리자", createdAt: "2026-05-15", views: 120 },
                ]);
            } else if (boardIdx === "2") {
                // 2번 게시판 (예: 리얼후기) 글들
                setPosts([
                    { id: 201, title: "여기 관리자 페이지 진짜 편하네요 대박!", author: "김개발", createdAt: "2026-06-02", views: 45 },
                    { id: 202, title: "후기 남기고 갑니다 적극 추천!", author: "이디자인", createdAt: "2026-06-01", views: 88 },
                ]);
            } else {
                // 3번 게시판 (예: Q&A) 글들
                setPosts([
                    { id: 301, title: "권한 설정은 어떻게 바꾸나요?", author: "박질문", createdAt: "2026-06-02", views: 12 },
                ]);
            }

            setIsLoading(false);
        };

        fetchBoardData();
    }, [boardIdx]); // 👈 이 [boardIdx] 덕분에 사용자가 1번, 2번, 3번을 누를 때마다 이 코드가 알아서 다시 실행됩니다!

    return (
        <Container>
            {/* 1. 상단 대시보드 헤더 영역 */}
            <HeaderSection>
                <TitleWrapper>
                    <PageTitle>
                        {isLoading ? "불러오는 중..." : boardInfo ? boardInfo.name : "게시판 관리"}
                    </PageTitle>
                    <PageDesc>
                        {boardInfo 
                            ? `게시판 유형: ${boardInfo.type} | 읽기 권한: [${boardInfo.readAuth}] | 쓰기 권한: [${boardInfo.writeAuth}]`
                            : "게시판 정보를 실시간으로 관리하고 조회합니다."}
                    </PageDesc>
                </TitleWrapper>
                <ActionButtons>
                    <Button variant="outline" size="md" leftIcon={<FiSettings />}>
                        게시판 설정
                    </Button>
                    <Button 
                        variant="primary" 
                        size="md" 
                        leftIcon={<FiPlus />}
                        onClick={() => alert("글쓰기 페이지로 이동합니다!")}
                    >
                        새 글 등록
                    </Button>
                </ActionButtons>
            </HeaderSection>

            {/* 2. 필터 및 검색 바 카드 */}
            <FilterCard>
                <SearchBoxWrapper>
                    <Input
                        placeholder="검색할 제목이나 내용을 입력하세요"
                        leftIcon={<FiSearch />}
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        fullWidth
                    />
                </SearchBoxWrapper>
                <FilterOptions>
                    <Button variant="secondary" size="md">
                        검색
                    </Button>
                </FilterOptions>
            </FilterCard>

            {/* 3. 모던한 게시글 데이터 테이블 카드 */}
            <TableCard>
                <Table>
                    <thead>
                        <tr>
                            <Th width="80px" $center>번호</Th>
                            <Th>제목</Th>
                            <Th width="130px" $center>작성자</Th>
                            <Th width="130px" $center>등록일</Th>
                            <Th width="90px" $center>조회수</Th>
                            <Th width="100px" $center>관리</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <Tr key={post.id}>
                                    <Td $center>{post.id}</Td>
                                    <Td>
                                        <TitleCell>
                                            <FiFileText size={16} color="#4e73df" />
                                            <TitleText>{post.title}</TitleText>
                                        </TitleCell>
                                    </Td>
                                    <Td $center><AuthorBadge>{post.author}</AuthorBadge></Td>
                                    <Td $center><DateText>{post.createdAt}</DateText></Td>
                                    <Td $center><ViewCount>{post.views}</ViewCount></Td>
                                    <Td $center>
                                        <ActionGroup>
                                            <Button variant="outline" size="sm">수정</Button>
                                        </ActionGroup>
                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            <tr>
                                <Td colSpan={6}>
                                    <EmptyState>
                                        등록된 게시글이 없습니다. 새로운 글을 작성해 보세요!
                                    </EmptyState>
                                </Td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </TableCard>
        </Container>
    );
}

// --- Modern Styled Components ---

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 32px;
    background-color: #f8f9fc;
    min-height: 100vh;
`;

const HeaderSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 16px;
`;

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const PageTitle = styled.h1`
    font-size: 1.75rem;
    font-weight: 800;
    color: #2e384d;
    letter-spacing: -0.5px;
`;

const PageDesc = styled.p`
    font-size: 0.92rem;
    color: #8792a2;
    font-weight: 500;
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 10px;
`;

const FilterCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: $center;
    background: #ffffff;
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);
    border: 1px solid #e3e6f0;
    gap: 16px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

const SearchBoxWrapper = styled.div`
    flex: 1;
    max-width: 450px;
`;

const FilterOptions = styled.div`
    display: flex;
    gap: 8px;
`;

const TableCard = styled.div`
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);
    border: 1px solid #e3e6f0;
    overflow: hidden;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: left;
`;

const Th = styled.th<{ width?: string; $center?: boolean }>`
    background: #f8f9fc;
    padding: 16px 20px;
    font-size: 0.85rem;
    font-weight: 700;
    color: #4e73df;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid #e3e6f0;
    width: ${({ width }) => width || "auto"};
    text-align: ${({ $center }) => ($center ? "$center" : "left")};
    ${Unselectable}
`;

const Tr = styled.tr`
    transition: background-color 0.15s ease-in-out;
    border-bottom: 1px solid #f1f3f9;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: #f8f9fc;
    }
`;

const Td = styled.td<{ $center?: boolean }>`
    padding: 16px 20px;
    font-size: 0.92rem;
    color: #3a3b45;
    text-align: ${({ $center }) => ($center ? "$center" : "left")};
`;

const TitleCell = styled.div`
    display: flex;
    align-items: $center;
    gap: 10px;
`;

const TitleText = styled.span`
    ${Ellipsis}
    max-width: 500px;
    font-weight: 600;
    color: #2e384d;
    cursor: pointer;

    &:hover {
        color: #4e73df;
        text-decoration: underline;
    }
`;

const AuthorBadge = styled.span`
    background-color: #eaecf4;
    color: #4e73df;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
`;

const DateText = styled.span`
    color: #858796;
    font-size: 0.85rem;
`;

const ViewCount = styled.span`
    color: #6e707e;
    font-weight: 500;
    font-size: 0.88rem;
`;

const ActionGroup = styled.div`
    display: flex;
    justify-content: $center;
    gap: 6px;
`;

const EmptyState = styled.div`
    padding: 60px 0;
    text-align: $center;
    color: #858796;
    font-size: 0.95rem;
    font-weight: 500;
`;