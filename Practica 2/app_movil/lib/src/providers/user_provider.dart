import 'dart:convert';

import 'package:http/http.dart' as http;

import 'package:app_movil/src/providers/global.dart';
import 'package:app_movil/src/preferences/user_prefecence.dart';

class UserProvider {
  final String _url = backendURL();
  final _prefs = new UserPreference();

  Future<bool> login(String nickname, String password) async {
    final authData = {'nickname': nickname, 'contrasenia': password};

    final res = await http.post('$_url/user/login',
        headers: {'Content-Type': 'application/json'},
        body: json.encode(authData));

    final Map<String, dynamic> decodedRes = json.decode(res.body);
    // print(decodedRes);

    if (decodedRes['code'] != '200') return false;

    _prefs.userID = decodedRes['data']['idUsuario'];
    return true;
  }
}
