import { Holiday } from "@/app/types/holiday"



// 공휴일 이름에 맞춰 이모지를 매핑해주는 함수
const getHolidayEmoji = (name:string) =>{
    if(name.includes('성탄') || name.includes('크리스마스') || name.toLowerCase().includes('christmas')) return '🎄';
    if (name.includes('추석')) return '🌕🐇';
    if (name.includes('개천')) return '🇰🇷';
    if (name.includes('한글')) return '📜';
    if (name.includes('어린이')) return '🧸';
    if (name.includes('신정') || name.includes('설')) return '🌅';

    return'';
}

// 임시 공휴일 데이터 (현재 2026년 9월 기준으로 작성)
const mockHolidays: Record<string, Holiday[]> = {
  "2026-2": [
    { date: 16, name: "설날 연휴" },
    { date: 17, name: "설날" },
    { date: 18, name: "설날 연휴" }
  ],
  "2026-9": [
    { date: 24, name: "추석" },
    { date: 25, name: "추석" },
    { date: 26, name: "추석" }
  ],
  "2026-10": [
    { date: 3, name: "개천절" },
    { date: 9, name: "한글날" }
  ],
  "2026-12": [
    { date: 25, name: "성탄절" }
  ]
};

export const fetchHolidays = async (year: number, month: number): Promise<Holiday[]> => {
  // 실제 API 통신을 하는 것처럼 살짝 지연 효과를 줌 (필요 시 삭제 가능)
  await new Promise((resolve) => setTimeout(resolve, 100));

  const key = `${year}-${month}`;
  const holidays = mockHolidays[key] || [];

  //가져온 공휴일에 이모지를 자동으로 붙여서 리턴합니다.
  return holidays.map(h=> ({
    ...h,
    emoji: getHolidayEmoji(h.name)
  }))
};



// export const fetchHolidays = 
// async(year:number, month:number) : Promise<Holiday[]>=>{

//     if(month===9){
//         return[
//             {date:24, name:'추석연휴'},
//             {date:25, name:'추석'},
//             {date:26, name:'추석연휴'},
//         ];
//     }

//     if(month ===12){
//         return[
//             {date:25, name:'성탄절'}
//         ]
//     }
    
//     return [];
// }