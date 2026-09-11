import 'package:flutter/material.dart';
// 💡 [경로 수정 완료] main.dart에 있는 DatingHomeScreen으로 넘어가기 위해 불러옵니다.
//GPS 위치권한 패키지
import 'package:geolocator/geolocator.dart';
//카카오 지도 웹뷰
import 'package:flutter_inappwebview/flutter_inappwebview.dart';

import '../main.dart'; 


class MapSearchScreen extends StatefulWidget {
  const MapSearchScreen({super.key});

  @override
  State<MapSearchScreen> createState() => _MapSearchScreenState();
}

class _MapSearchScreenState extends State<MapSearchScreen> {
  final Color bgColor = const Color(0xFF12121A);
  final Color cardColor = const Color(0xFF22222E);
  final Color pinkAccent = const Color(0xFFFF4B93);
  final Color subTextColor = const Color(0xFFA0A0B0);

  // 필터 상태 관리 // 추후 관리자 페이지에서 db로 받아와서 setting되도록 ..바꿈
  int _selectedCategoryIndex = 0;
  final List<String> categories = ['동네 친구', '커피 한잔', '술 한잔', '영화/문화'];
  
  //관리자에서 키로수를 변경하거나..할 수 있게 변경해야함
  String _selectedRadius = '반경 1km';
  final List<String> radiusOptions = ['반경 1km', '반경 3km', '반경 5km'];
  
  String _selectedAge = '20대 초중반';
  final List<String> ageOptions = ['20대 초중반', '20대 후반', '30대 초반', '상관없음'];

  Position? _currentPosition ;
  bool _isLoadingLocation = true;

  //화면 진입시 위치기반 권한 스낵바 띄우기
  @override
  void initState(){
    super.initState();
    //화면이 그려진 직후에 예쁜 스낵바를 띄우기위해 addPostFrameCallback 사용
    // _getCurrentLocation();
    WidgetsBinding.instance.addPostFrameCallback((_){
      _checkAndRequestPermissionSnackbar();
    });
  }
    //새로 추가되면서 1단계...스낵바를 먼저 띄워서 유저 설득
  Future<void> _checkAndRequestPermissionSnackbar() async{
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if(!serviceEnabled){
      _showErrorSnackbar('휴대폰의 GPS위치서비스가 꺼져 있습니다');
      return;
    }
    LocationPermission permission = await Geolocator.checkPermission();

    if(permission == LocationPermission.denied){
      if(mounted){
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('원활한 주변 인연 매칭을 위해 위치 권한이 필요해요 💘',style: TextStyle(fontWeight: FontWeight.bold),), 
            backgroundColor: pinkAccent.withOpacity(0.2),
            duration: const Duration(days: 365),
            behavior: SnackBarBehavior.floating,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            margin: const EdgeInsets.all(16),
            action: SnackBarAction(
              label: '권한 허용하기',textColor: Colors.white,
              onPressed: () async{
                permission = await Geolocator.requestPermission();
                if(permission == LocationPermission.whileInUse || permission == LocationPermission.always){
                  _getActualLocation(); //허용되면 위치 가져오기
                }else{
                  _showErrorSnackbar('위치권한이 거부되었습니다');
                }
              },
            )
        ));
      }
    }else if(permission == LocationPermission.deniedForever){
      _showErrorSnackbar('위치권한이 영구적으로 거부되었습니다. 설정에서 변경해주세요');
    }else{
      _getActualLocation();
    }
  }

  //gps 위치권한 요청 및 현재 위치 가져오기
  Future<void> _getCurrentLocation() async{
    bool serviceEnabled;
    LocationPermission permission ;
    
    // 1. 스마트폰 자체의 위치 서비스(GPS)가 켜져 있는지 확인
    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if(!serviceEnabled){
      return Future.error('위치 서비스가 비활성화 되어잇습니다');
    }

    // 2. 현재 앱이 위치 권한을 가지고 있는지 확인
    permission = await Geolocator.checkPermission();

    // 3. 권한이 거부된 상태라면 팝업창 띄워서 다시 요청
    if(permission == LocationPermission.denied){
      permission = await Geolocator.requestPermission(); //위치 권한을 요청하는 팝업창⚠️한번더물음
      if (permission == LocationPermission.denied) {
        return Future.error('위치권한이 거부되었습니다.');
      }
    }
    // 4. 사용자가 '다시 묻지 않음' 등으로 영구 거부한 경우
    if(permission == LocationPermission.deniedForever){
      return Future.error('위치권한이 영구적으로 거부되었습니다. 설정에서 변경해주세요');
    }

    // 5. 모든 관문을 통과했다면 현재 위치(위도, 경도) 가져오기
    Position position = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high); //정확도 높은 위치
    setState(() { //화면상태업데이트
      _currentPosition = position;
      _isLoadingLocation= false;
    });
  }
  // 2단계: 실제 위치 가져오기
  Future<void> _getActualLocation() async{
    try{
      Position position = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
      setState(() {
        _currentPosition =position;
        _isLoadingLocation=false;
      });
    }catch(e){
      _showErrorSnackbar('위치 가져오는데 실패했습니다');
    }
  }

// 에러 스낵바
  void  _showErrorSnackbar(String message){
    if(mounted){
     ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Colors.redAccent,
        behavior: SnackBarBehavior.floating,
        ));
       setState(() => _isLoadingLocation =false); //로딩끄기
    }
  }

  //하단 대기 유저 더미 데이터
  final List<Map<String, dynamic>> nearbyUsers = [
    {'distance': '800m', 'gender': '여', 'name': '지은', 'interest': '카페 탐방'},
    {'distance': '1.2km', 'gender': '남', 'name': '민준', 'interest': '한강 산책'},
    {'distance': '2.5km', 'gender': '여', 'name': '수연', 'interest': '영화 보기'},
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.black,
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 480),
          child: Scaffold(
            backgroundColor: bgColor,
            // 상단바를 투명하게 만들고 지도 위에 겹치게 합니다.
            extendBodyBehindAppBar: true,
            appBar: AppBar(
              backgroundColor: Colors.transparent,
              elevation: 0,
              title: Row(
                children: [
                  Icon(Icons.location_on, color: Color(0xFFFF4B93), size: 24),
                  SizedBox(width: 8),
                  Text(
                    _isLoadingLocation ? '위치 찾는중...' : '내위치 확인완료',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
                ],
              ),
            ),
           body: Column(
              children: [
                Expanded(
                  flex: 4,
                  child: _buildKakaoMap(),
                ),
                Expanded(
                  flex: 6,
                  child: Container(
                    width: double.infinity,
                    decoration: BoxDecoration(
                      color: bgColor,
                      borderRadius: const BorderRadius.only(topLeft: Radius.circular(24), topRight: Radius.circular(24)),
                      boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.5), blurRadius: 10, offset: const Offset(0, -5))],
                    ),
                    child: Column(
                      children: [
                        _buildCategoryTabs(),
                        const Divider(color: Color(0xFF22222E), thickness: 1),
                        Padding(
                          padding: const EdgeInsets.all(20.0),
                          child: Column(
                            children: [
                              _buildDropdownRow('탐색 반경', _selectedRadius, radiusOptions, (val) => setState(() => _selectedRadius = val!)),
                              const SizedBox(height: 24),
                              SizedBox(
                                width: double.infinity,
                                height: 56,
                                child: ElevatedButton(
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: pinkAccent,
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                                  ),
                                  onPressed: () {
                                    //기존 스와이프 매칭 화면으로 넘어가기 
                                    Navigator.push(context, MaterialPageRoute(builder: (context)=> const DatingHomeScreen()));
                                    // 👉 백엔드로 내 위치와 반경을 보내어 근처 유저를 검색합니다.
                                  },
                                  child: const Text('주변 인연 찾기', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
                                ),
                              ),
                            ],
                          ),
                        ),
                        Expanded(child: _buildNearbyUsersList()),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  //🗺️ 카카오 지도 렌더링 영역
  Widget _buildKakaoMap(){
    if(_isLoadingLocation || _currentPosition ==null){
      return const Center(child: CircularProgressIndicator(color: Color(0xFFFF4B93)));
    }
        return InAppWebView(
          initialData: InAppWebViewInitialData(data: """
          <!DOCTYPE html>
          <html>
          <head>
          <meta charset="utf-8"/>
          <title>Kakao Map</title>
          <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=a0bf46b6f85adb1c911c864cba503e22"></script>
          <style>
            body,html{margin:0; padding:0; height:100%;}
            #map{width:100%; height:100%;}
          </style>
          </head>
          <body>
            <div id="map"></div>
            <script>
            var container = document.getElementById('map');
            //내 현재 위치 좌표 객체 생성
            var currentLatLng = new kakao.maps.LatLng(${_currentPosition!.latitude}, ${_currentPosition!.longitude})
            var options = {
              center: currentLatLng,
              level: 3
            };
            // 2. 지도 생성
            var map = new kakao.maps.Map(container, options);

             // 3. 내 위치에 마커 렌더링
            var marker = new kakao.maps.Marker({
              position: currentLatLng
            });
            marker.setMap(map);
            </script>
          </body>
          </html>
"""),
        );
  }

  // 🗺️ 가짜 지도 화면 (카카오/구글맵 연동 전)
  Widget _buildMapPlaceholder() {
    return Container(
      width: double.infinity,
      decoration: const BoxDecoration(
        color: Color(0xFF1E202C), // 지도가 없을 때 보여질 어두운 맵시 배경
        image: DecorationImage(
          // 실제 지도 API 연동 전 임시 이미지
          image: NetworkImage('https://maps.googleapis.com/maps/api/staticmap?center=Seoul&zoom=14&size=600x400&maptype=roadmap&style=feature:all|element:labels.text.fill|color:0xffffffff&style=feature:all|element:labels.text.stroke|color:0x000000&style=feature:water|element:geometry|color:0x12121a&style=feature:landscape|element:geometry|color:0x22222e'),
          fit: BoxFit.cover,
        ),
      ),
      child: Stack(
        alignment: Alignment.center,
        children: [
          // 내 위치 펄스 애니메이션 느낌의 원
          Container(
            width: 150,
            height: 150,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: pinkAccent.withOpacity(0.2),
              border: Border.all(color: pinkAccent.withOpacity(0.5), width: 1),
            ),
          ),
          const Icon(Icons.my_location, color: Colors.white, size: 32),
          
          // 주변 유저 핑 (가짜 데이터)
          Positioned(top: 80, left: 100, child: _buildMapPing()),
          Positioned(bottom: 50, right: 80, child: _buildMapPing()),
          Positioned(top: 150, right: 120, child: _buildMapPing()),
        ],
      ),
    );
  }

  Widget _buildMapPing() {
    return Container(
      width: 16, height: 16,
      decoration: BoxDecoration(
        color: const Color(0xFF00E5FF),
        shape: BoxShape.circle,
        border: Border.all(color: Colors.white, width: 2),
      ),
    );
  }

  // 🏷️ 목적 탭 (동네친구, 커피한잔 등)
  Widget _buildCategoryTabs() {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
      child: Row(
        children: List.generate(categories.length, (index) {
          bool isSelected = _selectedCategoryIndex == index;
          return GestureDetector(
            onTap: () => setState(() => _selectedCategoryIndex = index),
            child: Container(
              margin: const EdgeInsets.only(right: 8),
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
              decoration: BoxDecoration(
                color: isSelected ? pinkAccent : Colors.transparent,
                borderRadius: BorderRadius.circular(20),
              ),
              child: Text(
                categories[index],
                style: TextStyle(
                  color: isSelected ? Colors.white : subTextColor,
                  fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                ),
              ),
            ),
          );
        }),
      ),
    );
  }

  // 🔻 드롭다운 필터 조립기
  Widget _buildDropdownRow(String title, String value, List<String> items, ValueChanged<String?> onChanged) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(title, style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
        Container(
          height: 40,
          padding: const EdgeInsets.symmetric(horizontal: 12),
          decoration: BoxDecoration(
            color: cardColor,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: subTextColor.withOpacity(0.3)),
          ),
          child: DropdownButtonHideUnderline(
            child: DropdownButton<String>(
              value: value,
              dropdownColor: cardColor,
              icon: Icon(Icons.expand_more, color: subTextColor),
              style: const TextStyle(color: Colors.white, fontSize: 14),
              items: items.map((String item) {
                return DropdownMenuItem<String>(
                  value: item,
                  child: Text(item),
                );
              }).toList(),
              onChanged: onChanged,
            ),
          ),
        ),
      ],
    );
  }

  // 👥 주변 대기 유저 리스트
  Widget _buildNearbyUsersList() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 20, right: 20, bottom: 8),
          child: Text(
            '근처 접속 중인 유저 $_selectedRadius',
            style: TextStyle(color: subTextColor, fontSize: 13),
          ),
        ),
        Expanded(
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 0),
            itemCount: nearbyUsers.length,
            separatorBuilder: (context, index) => Divider(color: cardColor, thickness: 1),
            itemBuilder: (context, index) {
              final user = nearbyUsers[index];
              return Padding(
                padding: const EdgeInsets.symmetric(vertical: 8),
                child: Row(
                  children: [
                    // 💡 [수정 완료] SizedBox로 width를 주어 정렬이 안 틀어지게 고정했습니다.
                    SizedBox(
                      width: 60, 
                      child: Text(user['distance'], style: TextStyle(color: pinkAccent, fontWeight: FontWeight.bold, fontSize: 14))
                    ),
                    SizedBox(
                      width: 40, 
                      child: Text(user['gender'], style: const TextStyle(color: Colors.white, fontSize: 14))
                    ),
                    Expanded(
                      child: Text(user['name'], style: const TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.bold))
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(color: cardColor, borderRadius: BorderRadius.circular(8)),
                      child: Text(user['interest'], style: TextStyle(color: subTextColor, fontSize: 12)),
                    )
                  ],
                ),
              );
            },
          ),
        ),
      ],
    );
  }
  

  
}