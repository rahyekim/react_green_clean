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
return Container();
}

//서브 사진 등록 박스 디자인 (간단한 + 모양)
Widget _buildSubPhotoBox(){
  return Container();
}

// 🧱 부품 4: 닉네임 입력칸 
Widget _buildNicknameSection(){
  return Container();
}

// 🧱 부품 5:나이성별입력칸(한줄나란히배치)
Widget _buildAgeAndGenderSection(){
  return Container();
}
//성별 버튼 디자인 및 클릭시 색상 로직변경
Widget _buildGenderButton(String gender){
  return Container();
}
//🧱 부품 6: 자기소개입력칸
Widget _buildBioSection(){
  return Container();
}

// 🧱 부품 7: 관심사 선택칸 Wrap사용
Widget _buildInterestSection(){
  return Container();
}

//🧱 부품 8:하단 다음단계 버튼
Widget _buildNextButton(){
  return Container();
}

//공용도구
Widget _buildSectionTitle(String title){
return Container();
}

//공용도구2
Widget _buildTextField(){
  return Container();
}


}