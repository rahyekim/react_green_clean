import 'package:flutter/material.dart';
/*
StatefulWidget (껍데기): 이름표 "나 이런 화면이야" 하고 외부에 알려주는 껍데기.

State 클래스 (_SignupProfileScreenState - 알맹이):
이 화면이 어떤 상태를 가지고 있고, 어떤 데이터가 변하는지를 실제로 관리하는 진짜 핵심 브레인입니다. 
사용자가 닉네임을 치거나 버튼을 누르면 이 알맹이 안의 데이터가 바뀝니다.
*/

//글씨를 치거나 버튼을 눌렀을 때 모양이 변하는 화면을 만들기위해 wideget 사용
class SignupProfileScreen extends StatefulWidget{

  const SignupProfileScreen({super.key});

  @override
  State<SignupProfileScreen> createState()=> _SignupProfileScreenState();
}

//실제로화면의 모양을 그리고 상태(데이터)를 저장하는 핵심공간
class _SignupProfileScreenState extends State<SignupProfileScreen>{
  //디자인테마색상 정하기 0xFF 투명도100%, 뒤의 6자리는 헥스(hex) 16진수표기법 색상 코드
  final Color bgColor = const Color(0xFF12121A);
  final Color cardColor = const Color(0xFF22222E);
  final Color borderColor = const Color(0xFF38384a);
  final Color pinkAccent = const Color(0xFFFF4B93);
  final Color puppleAccent = const Color(0xFFB635F7);
  final Color textColor = Colors.white;
  final Color subTextColor = const Color(0xFFA0A0B0);

  //선택한 데이터를 기억하는 변수들(상태관리)
  String _selectedGender = '여성';
  final List<String> _selectedInterests = ['카페','영화','독서'];

  //화면에 뿌려줄 관심사 버튼 데이터 목록
  final List<Map<String, String>> _interestsData =[
    {'icon': '☕', 'label': '카페'},
    {'icon': '🎬', 'label': '영화'},
    {'icon': '🎵', 'label': '음악'},
    {'icon': '📚', 'label': '독서'},
    {'icon': '🏃', 'label': '운동'},
    {'icon': '✈️', 'label': '여행'},
    {'icon': '🍳', 'label': '요리'},
    {'icon': '🎮', 'label': '게임'},
  ]; 

   //📱 [4] 실제로 화면을 그리는 build 함수
  @override
  Widget build(BuildContext context){
    return Scaffold(
      backgroundColor: bgColor,
      body: SafeArea( //핸드폰의 노치(카메라파인부분)나 하단 바에 UI가 가려?????
        child: Column( //위에서 아래로 위젯(화면조각)들을 차곡차곡 쌓음 
        children: [
          _buildTopBar(), //맨위에 뒤로가기 버튼과 분홍색 진행률 바를 그림 
          Expanded( //남은화면공간 꽉채우라
            child: SingleChildScrollView(  //내용이 길어지면 화면을 위아래로 스크롤(드래그)
               padding: const EdgeInsets.symmetric(horizontal: 24.0,vertical: 16.0), //양옆과 위아래여백
               child: Column(
                crossAxisAlignment: CrossAxisAlignment.start, //글씨화면 왼쪽정렬
                children: [
                  _buildHeader(), const SizedBox(height: 32,),
                  _buildPhotoSection(), const SizedBox(height: 24,),
                  _buildNicknameSection(), const SizedBox(height: 24,),
                  _buildAgeAndGenderSection(), const SizedBox(height: 24,),
                  _buildBioSection(), const SizedBox(height: 24,),
                  _buildInterestSection(), const SizedBox(height: 40,),
                  _buildNextButton(), const SizedBox(height: 20,),
                ],
               ),
            ),
          ) 
        ],
        )),
    );
  }

/// 🧱 부품 1: 상단 앱바 (뒤로가기, 프로그레스 바)
Widget _buildTopBar(){
  return Padding(
    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
    child: Row(
      children: [//뒤로가기 동그란 버튼만들기
        Container(
          width: 40, height: 40, 
          decoration: BoxDecoration(
            color: cardColor, shape: BoxShape.circle),
          child: IconButton(icon: Icon(Icons.arrow_back, color: textColor, size: 20,),
              onPressed: ()=> Navigator.pop(context)
            )), 
        const SizedBox(width: 16,),
        Expanded( // 진행 상태 표시바
          child: Stack(
            children: [
              Container(
                height: 4, decoration: BoxDecoration(
                   color: cardColor, borderRadius: BorderRadius.circular(2))),
              // 그 위에 덮이는 핑크/퍼플 그라데이션 선
              FractionallySizedBox(widthFactor: 0.6,
                child: Container(
                  height: 4, 
                  decoration: BoxDecoration(
                    gradient: LinearGradient(colors: [pinkAccent, puppleAccent]),
                    borderRadius: BorderRadius.circular(2)),
                ),)
        ],)),
        const SizedBox(width: 16,),
        Text('3/5', style: TextStyle(color: subTextColor, fontSize: 14, fontWeight:FontWeight.bold))
      ],
    ),
  );
}

//🧱 부품 2:헤더 타이틀(나를소개해요~)
Widget _buildHeader(){
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text('나를 소개해요', style: TextStyle(color: textColor, fontSize: 26, fontWeight: FontWeight.w800)),
      const SizedBox(height: 8,),
      Text('프로필 사진과 기본 정보를 입력해주세요', style: TextStyle(color: subTextColor, fontSize: 14)),
    ],
  );
}
// 🧱 부품 3: 프로필 사진 3장 등록하는 곳
Widget _buildPhotoSection(){
  return SizedBox(
    height: 150, child: Row(
      children: [
        Expanded(child: _buildMainPhotoBox(), flex: 2,), //가장큰메인사진칸 비율2
        const SizedBox( width:12,),
        Expanded(child: _buildSubPhotoBox(), flex: 1,), //서브사진칸 비율1
        const SizedBox( width:12,),
        Expanded(child: _buildSubPhotoBox(), flex: 1,), //서브사진칸2 비율1
        const SizedBox( width:12,),
      ],
    ),
  );
}

// 메인 사진 등록 박스 디자인
Widget _buildMainPhotoBox(){
return Container(
  decoration: BoxDecoration(
    color: cardColor,
    borderRadius: BorderRadius.circular(16),
    border: Border.all(color: borderColor, width: 1.5)
  ),
  child: Stack(
    alignment: Alignment.center,
    children: [
      Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.camera_alt, color: subTextColor,size: 32,),
          const SizedBox(height: 8,),
          Text('대표 사진', style: TextStyle(color: subTextColor, fontSize: 12),)
        ],
      ),
      Positioned(
        bottom:12, left: 12, 
        child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10,vertical: 4),
        decoration: BoxDecoration(
          gradient: LinearGradient(colors:  [pinkAccent,puppleAccent]),
          borderRadius: BorderRadius.circular(12),
        ),
        child: const Text('메인', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold ),),
      ), )
    ],
  ),
);
}

//서브 사진 등록 박스 디자인 (간단한 + 모양)
Widget _buildSubPhotoBox(){
  return Container(
    decoration: BoxDecoration(
      color: cardColor,
      borderRadius: BorderRadius.circular(16),
      border: Border.all(color: borderColor, width: 1.5)
    ),
    child: Center(child: Icon(Icons.add, color: subTextColor, size: 28,),),
  );
}

// 🧱 부품 4: 닉네임 입력칸 
Widget _buildNicknameSection(){
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      _buildSectionTitle('닉네임'),
      const SizedBox(height: 8,),
      _buildTextField(hint:'별빛소나타'),
    ],
  );
}

// 🧱 부품 5:나이성별입력칸(한줄나란히배치)
Widget _buildAgeAndGenderSection(){
  return Row(
    children: [
      //나이입력창(화면비율 4차지)
      Expanded(flex:4, child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionTitle('나이'),
          const SizedBox(height: 8,),
          _buildTextField(hint:'27', isNumber:true),
        ],
      ),),
      const SizedBox(width: 16,),
      Expanded(flex:6 , child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionTitle("성별"),
          const SizedBox(height: 8,),
          Row(
            children: [
              Expanded(child: _buildGenderButton('여성'),),
              const SizedBox(width: 12,),
              Expanded(child: _buildGenderButton('남성'),)
            ],
          )
        ],
      ))
    ],
  );
}
//성별 버튼 디자인 및 클릭시 색상 로직변경
Widget _buildGenderButton(String gender){
  bool isSeleted = _selectedGender == gender;
  //현재 내가 선택한 성별인지 확인
  return GestureDetector( //터치이벤트 감지하는 위젯
  onTap: (){
    setState(()=> _selectedGender= gender);
    },
    child: Container(
      padding: const EdgeInsets.symmetric(vertical: 16),
      decoration: BoxDecoration(
        color: isSeleted? pinkAccent.withOpacity(0.1) : cardColor,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: isSeleted ? pinkAccent: Colors.transparent, width: 1.5),
      ),
      alignment: Alignment.center,
      child: Text(
        gender, 
        style: TextStyle(
          color: isSeleted? pinkAccent : subTextColor, 
          fontWeight: isSeleted? FontWeight.bold: FontWeight.normal,
          fontSize: 16,
          ),
      ),
    ),
    );
}
//🧱 부품 6: 자기소개입력칸
Widget _buildBioSection(){
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      _buildSectionTitle('자기소개'),
      const SizedBox(height: 8,),
      _buildTextField(hint:'커피한잔과함께 영화이야기 나눌 사람찾아요',maxLines:3),

    ],
  );
}

// 🧱 부품 7: 관심사 선택칸 Wrap사용
Widget _buildInterestSection(){
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      _buildSectionTitle('관심사'),
      const SizedBox(height: 12,),
      Wrap( //자동줄바꿈
        spacing: 10, //버튼과버튼사이틈
        runSpacing: 10, //아래줄윗줄 틈 
        children: _interestsData.map((interest){
          bool isSelected = _selectedInterests.contains(interest['label']);
          return GestureDetector( //터치(클릭)감지 투명 버튼역할
            onTap: (){ //손가락으로 탭(터치)햇을때 실행
            setState(() { //화면 다시 그려달라고 플러터에게 요청
              if(isSelected){
                _selectedInterests.remove(interest['label']);
              }else{
                _selectedInterests.add(interest['label']!);
              }
            });
            },
          child:Container( //실제 눈에 보이는 알약모약 박스
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            decoration: BoxDecoration(
              color: isSelected ? pinkAccent.withOpacity(0.15) : cardColor,
              borderRadius: BorderRadius.circular(20), // 알약 모양을 위한 둥근 테두리 (추천!)
              border: Border.all(
                color: isSelected ? pinkAccent :Colors.transparent, width: 1.5),  
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
            children: [
              Text(interest['icon']!, 
              style: const TextStyle(fontSize: 14),),
              const SizedBox(width: 6,),
              Text(
                interest['label']!,
                style: TextStyle(
                  color: isSelected ? pinkAccent : subTextColor,
                  fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                  fontSize: 14,
                ),
                ),
            ],),
          ) ,
          );
        }).toList(),  //wrap의 childern은 tolist()로 받아야함
    )
    ],
  );
}

//🧱 부품 8:하단 다음단계 버튼
Widget _buildNextButton(){
  return Container(
    width: double.infinity, //가로길이 양쪽 끝까지 꽉차게
    height: 56,
    decoration: BoxDecoration(
      gradient: LinearGradient(colors: [pinkAccent,puppleAccent]),
      borderRadius: BorderRadius.circular(16),
    ),
    child: Material( //잉크가 톡 퍼지는 애니메이션 리플효과
    color: Colors.transparent,
    child: InkWell(
      borderRadius: BorderRadius.circular(16),
      onTap: () {
        print('다음단계진행');
      },
      child: const Center(
        child: Text('다음단계',
        style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    ),
    ),
  );
}

//공용도구
Widget _buildSectionTitle(String title){
return Text(title, style: TextStyle(color: textColor, fontSize: 15, fontWeight: FontWeight.bold),);
}

//공용도구2
Widget _buildTextField({required String hint, int maxLines=1, bool isNumber=false}){
  return TextField( //사용자가 화면의 키보드를 통해 글씨를 입력할 수 있는 필드(칸)
  maxLines: maxLines, //넘겨받은 줄 수만큼 높이 잡음 (자기소개3줄 나이1줄)
  keyboardType: isNumber ? TextInputType.number : TextInputType.text, //키보드 숫자판 or 글자판 띄워줌
  style: TextStyle(color: textColor, fontSize: 15),
  decoration:  InputDecoration( //텍스트 입력창 겉모양 꾸미기
    hintText: hint,
    hintStyle: TextStyle(color: subTextColor),
    filled: true,
    fillColor: cardColor,
    contentPadding: const EdgeInsets.all(16),
    //가만히 있을떄 기본 테두리
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: BorderSide.none),
      //입력가능할때(화면에 보일때) 테두리
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: BorderSide(color: borderColor, width: 1)),
      //사용자가입력하고 터치했을때 포커스테두리
    focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12),
    borderSide: BorderSide(color: pinkAccent, width: 1.3) )
  ),
  );
}


}