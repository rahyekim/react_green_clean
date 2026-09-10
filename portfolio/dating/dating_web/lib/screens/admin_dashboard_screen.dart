import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'admin_login_screen.dart';

class AdminDashboardScreen extends StatefulWidget {
  const AdminDashboardScreen({super.key});

  @override
  State<AdminDashboardScreen> createState() => _AdminDashboardScreenState();
}

class _AdminDashboardScreenState extends State<AdminDashboardScreen> {
  final Color bgColor = const Color(0xFF12121A);
  final Color cardColor = const Color(0xFF22222E);
  final Color pinkAccent = const Color(0xFFFF4B93);
  
  List<dynamic> _users = [];
  bool _isLoading = true;

  String get _baseUrl {
    if (kIsWeb) return 'http://localhost:3000';
    if (defaultTargetPlatform == TargetPlatform.android) return 'http://10.0.2.2:3000';
    return 'http://localhost:3000';
  }

  @override
  void initState() {
    super.initState();
    _fetchUsers();
  }

  Future<void> _fetchUsers() async {
    try {
      final response = await http.get(Uri.parse('$_baseUrl/api/admin/users'));
      final data = jsonDecode(response.body);
      if (response.statusCode == 200 && data['success'] == true) {
        setState(() {
          _users = data['users'];
          _isLoading = false;
        });
      }
    } catch (e) {
      setState(() => _isLoading = false);
    }
  }

  Future<void> _approveUser(int userId, String nickname) async {
    try {
      final response = await http.patch(Uri.parse('$_baseUrl/api/admin/users/$userId/approve'));
      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('$nickname 님 승인 완료!'), backgroundColor: Colors.green));
        _fetchUsers();
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('통신 에러')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bgColor,
      appBar: AppBar(
        title: const Text('회원 가입 심사', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
        backgroundColor: cardColor,
        elevation: 0,
        actions: [
          IconButton(icon: const Icon(Icons.refresh, color: Colors.white), onPressed: _fetchUsers),
          IconButton(
            icon: const Icon(Icons.logout, color: Colors.white),
            onPressed: () => Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => const AdminLoginScreen())),
          )
        ],
      ),
      body: _isLoading
          ? Center(child: CircularProgressIndicator(color: pinkAccent))
          : _users.isEmpty
              ? const Center(child: Text('가입한 회원이 없습니다.', style: TextStyle(color: Colors.white)))
              : ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: _users.length,
                  itemBuilder: (context, index) {
                    final user = _users[index];
                    final isPending = user['status'] == 'PENDING';

                    return Card(
                      color: cardColor,
                      margin: const EdgeInsets.only(bottom: 16),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      child: ExpansionTile(
                        iconColor: Colors.white,
                        collapsedIconColor: Colors.white70,
                        title: Row(
                          children: [
                            CircleAvatar(
                              backgroundColor: Colors.grey[800],
                              backgroundImage: user['profile_image_main'] != null ? NetworkImage('$_baseUrl${user['profile_image_main']}') : null,
                              child: user['profile_image_main'] == null ? const Icon(Icons.person, color: Colors.white) : null,
                            ),
                            const SizedBox(width: 16),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text('${user['nickname']} (${user['age']})', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                                Text(user['email'], style: const TextStyle(color: Colors.white70, fontSize: 12)),
                              ],
                            ),
                          ],
                        ),
                        trailing: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                          decoration: BoxDecoration(
                            color: isPending ? pinkAccent.withValues(alpha: 0.2) : Colors.green.withValues(alpha: 0.2),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(user['status'], style: TextStyle(color: isPending ? pinkAccent : Colors.greenAccent, fontWeight: FontWeight.bold, fontSize: 12)),
                        ),
                        children: [
                          Padding(
                            padding: const EdgeInsets.all(16.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(user['bio'] ?? '자기소개 없음', style: const TextStyle(color: Colors.white, fontSize: 14)),
                                const SizedBox(height: 16),
                                Row(
                                  children: [
                                    _buildImageBox(user['profile_image_main']),
                                    const SizedBox(width: 8),
                                    _buildImageBox(user['profile_image_sub1']),
                                    const SizedBox(width: 8),
                                    _buildImageBox(user['profile_image_sub2']),
                                  ],
                                ),
                                const SizedBox(height: 24),
                                if (isPending)
                                  SizedBox(
                                    width: double.infinity,
                                    height: 48,
                                    child: ElevatedButton(
                                      onPressed: () => _approveUser(user['id'], user['nickname']),
                                      style: ElevatedButton.styleFrom(backgroundColor: pinkAccent, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
                                      child: const Text('수질 검사 승인하기', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                                    ),
                                  ),
                              ],
                            ),
                          )
                        ],
                      ),
                    );
                  },
                ),
    );
  }

  Widget _buildImageBox(String? imagePath) {
    if (imagePath == null) return Expanded(child: Container(height: 100, decoration: BoxDecoration(color: Colors.grey[850], borderRadius: BorderRadius.circular(8)), child: const Icon(Icons.image_not_supported, color: Colors.white30)));
    return Expanded(child: Container(height: 100, decoration: BoxDecoration(borderRadius: BorderRadius.circular(8), image: DecorationImage(image: NetworkImage('$_baseUrl$imagePath'), fit: BoxFit.cover))));
  }
}