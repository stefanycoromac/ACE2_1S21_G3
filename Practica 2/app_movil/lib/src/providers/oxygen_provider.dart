import 'dart:convert';

import 'package:http/http.dart' as http;

import 'package:app_movil/src/providers/global.dart';
import 'package:app_movil/src/preferences/user_prefecence.dart';

class OxygenProvider {
  final String _url = backendURL();
  final _prefs = new UserPreference();

  Future<bool> create(int userID) async {
    final data = {'idUsuario': userID};

    final res = await http.post('$_url/oxygen',
        headers: {'Content-Type': 'application/json'}, body: json.encode(data));

    final Map<String, dynamic> decodedRes = json.decode(res.body);
    print(decodedRes);

    return true;
  }

  Future<bool> getTop() async {
    final url = '$_url/oxygen/${_prefs.userID}/top';
    final res = await http.get(url);

    final Map<String, dynamic> decodedData = json.decode(res.body);
    print(decodedData);

    return true;
  }

  Future<bool> getLast() async {
    final url = '$_url/oxygen/${_prefs.userID}/last';
    final res = await http.get(url);

    final Map<String, dynamic> decodedData = json.decode(res.body);
    print(decodedData);

    return true;
  }

  Future<bool> createDetail(int reading) async {
    final data = {'idOxigeno': _prefs.oxygenID, 'medicion': reading};

    final res = await http.post('$_url/oxygen/detail',
        headers: {'Content-Type': 'application/json'}, body: json.encode(data));

    final Map<String, dynamic> decodedRes = json.decode(res.body);
    print(decodedRes);

    return true;
  }

  Future<bool> getDetail() async {
    final url = '$_url/oxygen/detail/${_prefs.userID}/last';
    final res = await http.get(url);

    final Map<String, dynamic> decodedData = json.decode(res.body);
    print(decodedData);

    return true;
  }
}
