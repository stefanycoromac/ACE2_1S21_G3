import 'dart:convert';

import 'package:http/http.dart' as http;

import 'package:app_movil/src/providers/global.dart';
import 'package:app_movil/src/preferences/user_prefecence.dart';

class TemperatureProvider {
  final String _url = backendURL();
  final _prefs = new UserPreference();

  Future<bool> create(int userID) async {
    final data = {'idUsuario': userID};

    final res = await http.post('$_url/temperature',
        headers: {'Content-Type': 'application/json'}, body: json.encode(data));

    final Map<String, dynamic> decodedRes = json.decode(res.body);
    print(decodedRes);

    return true;
  }

  Future<bool> getTop() async {
    final url = '$_url/temperature/${_prefs.userID}/top';
    final res = await http.get(url);

    final Map<String, dynamic> decodedData = json.decode(res.body);
    print(decodedData);

    return true;
  }

  Future<bool> getLast() async {
    final url = '$_url/temperature/${_prefs.userID}/last';
    final res = await http.get(url);

    final Map<String, dynamic> decodedData = json.decode(res.body);
    print(decodedData);

    return true;
  }

  Future<bool> createDetail(int reading) async {
    final data = {'idTemperatura': _prefs.temperatureID, 'medicion': reading};

    final res = await http.post('$_url/temperature/detail',
        headers: {'Content-Type': 'application/json'}, body: json.encode(data));

    final Map<String, dynamic> decodedRes = json.decode(res.body);
    print(decodedRes);

    return true;
  }
}
