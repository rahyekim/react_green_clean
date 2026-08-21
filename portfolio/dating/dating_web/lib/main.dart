import 'package:flutter/material.dart'; //플러터 기본 UI 도구모음

import 'package:http/http.dart' as http; //백엔드 통신을 위한 http 패키지 가져오기

import 'dart:convert'; //JSON 데이터를 다루기위한 변환 도구 가져오기

import 'package:flutter_card_swiper/flutter_card_swiper.dart'; //Tinder처럼 카드를 좌우로 슥슥 넘기는 기능

//추가 앞으로 여기에 업뎃
import 'screens/signup_profile_screen.dart';

void main(){
  runApp(const DatingApp());  //DatingApp 위젯을 화면에 그림
}

//상태가 변하지 않는 기본 껍데기 위젯
class DatingApp extends StatelessWidget{

  //생성자(고유 키 지정)
  const DatingApp({super.key});

  @override
  Widget build(BuildContext context){  //UI를 그리는 함수
    return MaterialApp( //구글의 material design 기준 앱 시작 
      title: 'SPARK Dating Web',
      debugShowCheckedModeBanner: false, //오른쪽 debug빨간띠 숨기기
      theme: ThemeData( // 앱 전체의 기본 디자인(테마)설정
        // primarySwatch: Colors.pink,
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF12121A),
      ),
      home: const DatingHomeScreen(),
    );
  }
}
  //프로필 데이터를 담아둘 모델
  class Profile{
    final int id;
    final String nickname;
    final int age;
    final String bio;
    final String? photoUrl;

    Profile({ //클래스 생성자(필수값과 선택 값 지정)
    required this.id,
    required this.nickname,
    required this.age,
    required this.bio,
    this.photoUrl,
  });

  factory Profile.fromJson(Map<String, dynamic> json){
    return Profile(
      id:json['id'], 
      nickname: json['nickname'], 
      age:json['age']?? 20, 
      bio:json['bio']?? '',       //자기소개 없으면 빈칸
      photoUrl: json['photo_url'] //사진 주소 넣음 
    );
  }
}

//화면 내용이 계속 변할 수 있는(상태를 가지는) 홈 화면 위젯

class DatingHomeScreen extends StatefulWidget{

  const DatingHomeScreen({super.key});

  //상태관리 객체 생성
  @override
  State<DatingHomeScreen> createState() => _DatingHomeScreenState(); 
}


class _DatingHomeScreenState extends State<DatingHomeScreen>{

  //스와이프 동작을 제어하는 컨트롤러
  //카드를 왼쪽오른쪽 슉슉 넘기는 동작을 제어하는 리모콘
  final CardSwiperController controller = CardSwiperController();
  //화면에 보여줄 유저정보를 차곡차곡 담아둘 빈 바구니(리스트)준비
  List<Profile> profiles =[];
  bool isLoading=true; //서버에서 데이터가져오는 중인지 표시하는 boolean

  //add
  int _selectedIndex = 0;

  
  @override  //이 화면이 사용자에게 딱 처음 처음보여지기 직전에 단한번만 실행되는 준비함수
  void initState(){
    super.initState();
    fetchProfiles();
  }

  //백엔드 서버에 접속해서 유저 데이터를 가져오는 함수(시간이 걸리니까 async비동기씀)
  Future<void> fetchProfiles() async{
    
    try{ //내 컴퓨터(localhost)의 3000번 주소에 있는 백엔드에게 데이터 달라고 기다림await
      final res = await http.get(Uri.parse('http://localhost:3000/api/profiles'));
      if(res.statusCode == 200) {
        //서버가 정상200적으로 응답했다면 
        final body = jsonDecode(res.body); //응답body를 읽기쉽게 풀어준다
        final List<dynamic> data = body['data']; //진짜유저목록이 있는 data부분만 쏙 
        setState(() {
          //플러터에게 '데이터가져왔으니 화면 새로고침해서 다시그려줘' 라고명령
          profiles = data.map((json)=> Profile.fromJson(json)).toList();
          isLoading = false;
        }); //서버데이터를 아까 만든 Prifle바구니에 하나씩 담음
      }
    }catch(e){
      //만약 서버가 꺼졌거나 에러가 났을 때 작동하는 비상 대책
      setState(() {
        profiles = [  //백엔드가 없어도 화면이 잘 나오는지 테스트 위해 가짜 유저 두명
          Profile(id: 1, nickname: '테스터1', age: 25, bio: '안녕! 프론트엔드 테스트 중이야', photoUrl: 'https://picsum.photos/400/600'),
          Profile(id: 2, nickname: '테스터2', age: 28, bio: '왼쪽 오른쪽 스와이프 해봐!', photoUrl: 'https://picsum.photos/400/601'),
        ];
        isLoading = false;
      });
    }
  }
  //사용자가 카드를 좋아요(오른쪽) 또는 싫어요(왼쪽)넘겼을때 그 결과를 백엔드에
  Future<void> handleSwipe(int targetUserId, String action ) async{
    try{ //선택결과를 주는거라 post
      await http.post(
      Uri.parse('http://localhost:3000/api/swipe'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'sender_id':1, 'receiver_id': targetUserId, 'action': action,}),
      );
    }catch(e){
      print('서버통신실패(프론트UI만 동작 중입니다): $e');
    }
  }

  //여기서부터 진짜 눈에 보이는 화면UI 그리기 시작
  @override
  Widget build(BuildContext context){
    return Scaffold(   //앱의 뼈대(지붕,바닥,몸통)을 만들어주는 위젯
      //화면 맨위에 상단바
      appBar: AppBar(
        //Text('💘 Dating Match'), // backgroundColor: const Color.fromARGB(255, 240, 185, 203), 
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Row(
          children: [
            Icon(Icons.auto_awesome, color: Color(0xFFFF4B93),size: 24,),
            SizedBox(width: 4,),
            Text('SPARK', style: TextStyle(color: Color(0XFFF4B93),fontSize: 22, fontWeight: FontWeight.w900, letterSpacing: 1.2),), 
            ],
        ),
        actions: [
          //알림아이콘
          _buildTopIcon(Icons.notifications_none),
          const SizedBox(width: 8,),
          //설정아이콘 누르면 프로필(회원가입)화면으로 이동
          GestureDetector(
            onTap: (){
              Navigator.push(context, MaterialPageRoute(builder: (context)=> const SignupProfileScreen()));
            },
            child: _buildTopIcon(Icons.settings_outlined),
          ),
          const SizedBox(width: 16,),
        ],
      ),
        //로딩중이면 화면 정중앙center에 뱅글뱅글 아이콘 spinner 아이콘 보여줌
      body: isLoading 
      ? const Center(child: CircularProgressIndicator(color: Color(0xFFF4B93),))
      : profiles.isEmpty 
        ? const Center(child: Text('더이상 추천할 프로필이 없습니다'))
        : SafeArea(
          child:Padding(
            padding: const EdgeInsets.all(20.0), //카드주변 여백
            child: CardSwiper(
              controller:controller, 
              cardsCount: profiles.length, 
              onSwipe: (previousIndex, currentIndex, direction) { 
                //사용자가 손가락이나 마우스로 카드를 넘기는 순간 실행
                final swiperProfile = profiles[previousIndex]; //방금 화면밖으로 날아간 사람이 누구인지확인
                final action = direction == CardSwiperDirection.right? 'LIKE' : 'DISLIKE';
                handleSwipe(swiperProfile.id, action);
                //결정된 조아요/싫어요 결과를 서버로 전송하는 함수를 호출
                return true;
              }, //한장한장 카드모양을 직접 예쁘게 꾸미는 공장
              cardBuilder:(context, index, precentX, precentY){
                //지금 그리고 있는 카드의 주인이 누구인지 데이터 꺼냄
                final profile = profiles[index];
                return Card( //둥근 모서리 그림자가 있는 예쁜 흰색 종이 깔아줌
                  elevation: 6, //종이가 바닥에서 얼마나 떠잇는지(그림자깊이)
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                  clipBehavior: Clip.antiAlias, //사진이 종이밖으로 튀어나오면 깔끔하게 잘라냄 
                  child: Stack(
                    fit: StackFit.expand, //겹쳐진 내용물들이 종이크기에 꽉 차게 늘림
                    children: [//1층(사진), 2층(글씨) 순서대로 쌓아 올림
                    profile.photoUrl !=null //사람의 사진주소가 비어있지 않은지 확인
                    ? Image.network(profile.photoUrl!, fit: BoxFit.cover)
                    // 사진을 가져와서 카드에 빈틈없이 꽉 채워(cover)그림
                    : Container(color: Colors.grey[300], child: const Icon(Icons.person, size: 100)),
                    Positioned(
                      bottom: 0, left: 0, right: 0,
                      child: Container(
                        padding: const EdgeInsets.all(20), //상자안쪽 20만큼 여백(쿠션)줌 글씨붙지않게
                        decoration: const BoxDecoration(
                          gradient: LinearGradient(
                            colors: [Colors.transparent, Colors.black87],
                            begin: Alignment.topCenter, end: Alignment.bottomCenter
                            )),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start, //세워둔글씨를 왼족벽으로 가지런히정렬
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text( //닉네임과 나이를 보여주는  글씨
                            '${profile.nickname}, ${profile.age}',
                            style: const TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold),
                            ),
                            const SizedBox(height: 8),
                            Text(profile.bio, style: const TextStyle(color: Colors.white70,fontSize: 16),)
                          ],
                        ),
                      ), 
                    ),
                  ],
                ), 
              );
              // return _buildSparkCard(profile); ????
            },
            ),
          ),
        ),
    );
  }

//부품 상단바 둥근 배경 아이콘
Widget _buildTopIcon(IconData icon){
  return Container(
    width: 40, height: 40, 
    decoration: BoxDecoration(
      color: const Color(0xFF22222E), borderRadius: BorderRadius.circular(12),
    ),
    child: Icon(icon, color: Colors.white, size: 22,),
  );
}

//하단바 아이콘생성기 (선택되면 배경에 희미한 핑크색 빛이남)
BottomNavigationBarItem _buildBottomNavItem(String label, IconData icon, int index){
  bool isSelected = _selectedIndex  == index ;
  return BottomNavigationBarItem(
    icon: Container(
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: isSelected ? const Color(0xFFFF4B93).withOpacity(0.15) : Colors.transparent,
        borderRadius: BorderRadius.circular(12)
      ),
      child: Icon(icon),
    ),
    label: label,
  ); 
}

Widget _buildSparkCard (Profile profile){
  return Container(
    decoration: BoxDecoration(
      borderRadius: BorderRadius.circular(24),
      boxShadow: const[BoxShadow(color: Colors.black45, blurRadius: 10, offset: Offset(0, 5))]
    ),
    clipBehavior: Clip.antiAlias, //모서리 둥글게 자르기 
  );

}

  
}


