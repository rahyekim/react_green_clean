import 'package:flutter/material.dart'; //플러터 기본 UI 도구모음
import 'dart:async'; //future.delayed(타이머)기능

import 'login_screen.dart'; //로딩이 끝나면 넘어갈 로그인스크린화면



//화면에 로딩바가 차오르는 애니메이션(상태변화)가 있으므로 statefulwidget을 사용
class SplashScreen extends StatefulWidget{
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {

  final Color bgColor = const Color(0xFF12121A);
  final Color pinkAccent = const Color(0xFFFF4B93);
  final Color purpleAccent= const Color(0xFFB635F7);
  final Color subTextColor = const Color(0xFFA0A0B0);
  final Color textColor = Colors.white;
  final Color cardColor = const Color(0xFF22222E);

  //로딩바 애니매이션을 위한 상태변수
  double _loadingProgress = 0.0;

  @override
  void initState(){
    super.initState();

    Future.delayed(const Duration(milliseconds: 100), (){ //0.1초만 숨을 고른 뒤에 부드럽게 채워라
      if(mounted) {
        setState(() {
          _loadingProgress=1.0; //100%로변경
        });
      }
    });

    //2.5초 동안 멋진 스플래시 화면을 보여준 뒤 로그인화면으로 자동이동
    Future.delayed(const Duration(milliseconds: 2500), (){
      if(mounted){
        //뒤로가기 버튼을 눌러도 다시 스플래시화면으로 돌아오지 않는다
        Navigator.pushReplacement(context, 
        //부드럽게 화면이 밝아지며 넘어가는 페이드(Fade)애니메이션 효과
        PageRouteBuilder(
          pageBuilder: (context, animation, secondaryAnimation) => const LoginScreen(),
          transitionsBuilder: (context, animation, secondaryAnimation, child) => FadeTransition(opacity: animation, child: child,),
          transitionDuration: const Duration(milliseconds:800), //0.8초동안 부드럽게 전환
          )
        );
      }
    });
  }
  //화면을 그리는 메인함수
  @override
  Widget build(BuildContext context){
    return Scaffold(
      backgroundColor: bgColor,
      body: Stack(
        fit: StackFit.expand,
        children: [
          _buildBackgroudGlow(),
          SafeArea(child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _buildIconBox(), 
              const SizedBox(height: 24,), 
              _buildLogoText(), 
              const SizedBox(height:16),
              _buildSubText(),
              const SizedBox(height:48),
              _buildProgressBar(),
            ],
          ))
        ],
      ),
    );
  }

  //부품: 배경정중앙에 퍼지는 은은한 빛교화
  Widget _buildBackgroudGlow(){
    return Center(
      child: Container(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.width,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          gradient: RadialGradient(colors: [purpleAccent.withOpacity(0.15), bgColor.withOpacity(0.0) ], stops: const [0.2,1.0])
        ),
      ),
    );
  }

  //부품: ✨유리느낌(Glassmorphism)의 네모 박스와 물방울 아이콘
  Widget _buildIconBox(){
    return Container(
      width: 90, height: 90,
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.03), //✨흰색을 97%투명하게 3%만하얗게
        borderRadius: BorderRadius.circular(28),
        border: Border.all(color: Colors.white.withOpacity(0.08),width:1.5), //✨ 8%만하얗게
      ),
      child: Center(
        //아이콘에 그라데이션 색상을 입히기위해 shaderMask
        child: ShaderMask(
          shaderCallback: (bounds) => LinearGradient(
        colors: [pinkAccent, purpleAccent],
        begin: Alignment.topCenter,
        end:Alignment.bottomCenter,
        ).createShader(bounds),
        child: const Icon(Icons.water_drop, size: 40, color: Colors.white,),
        ),
      ),
    );
  }

  //부품: SPARK 그라데이션 로고 텍스트 
  Widget _buildLogoText(){
    return ShaderMask( //데코마스크를 씌움
      shaderCallback: (bounds) => LinearGradient(
        colors: [pinkAccent, purpleAccent],
        begin: Alignment.centerLeft,
        end:Alignment.centerRight,
        ).createShader(bounds),
        child: const Text('SPARK', 
        style: TextStyle(color:Colors.white, fontSize: 48, fontWeight: FontWeight.w900, letterSpacing: 2.0),),
    );
  }

  //부품: 로고밑의 안내문구 
  Widget _buildSubText(){
    return Text(
      '당신의 특별한 인연을 찾아드립니다',
      style: TextStyle(
        color: subTextColor,
        fontSize: 15, 
        fontWeight: FontWeight.w500,
        letterSpacing: 0.5,
      ),
    );
  }

  //스르륵 차오르는 로딩 바 애니메이션
  Widget _buildProgressBar(){
    return Container(
      width: 200, height: 4,
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.1),
        borderRadius: BorderRadius.circular(2),
      ),
      child: Align(
        alignment: Alignment.centerLeft,
        child: AnimatedContainer(duration: const Duration(milliseconds: 2000),
        width: 200 * _loadingProgress,
        decoration: BoxDecoration(
          gradient: LinearGradient(colors: [pinkAccent,purpleAccent]),
          borderRadius: BorderRadius.circular(2),
          boxShadow: [BoxShadow(color: pinkAccent.withOpacity(0.5),blurRadius: 6, offset: const Offset(0, 0))]
        ),),
      ),
    );
  }

}//end
  
