import 'package:shared_preferences/shared_preferences.dart';

class UserPreference {
  static final UserPreference _instance = new UserPreference._internal();

  factory UserPreference() {
    return _instance;
  }

  UserPreference._internal();

  SharedPreferences _prefs;

  initPrefs() async {
    this._prefs = await SharedPreferences.getInstance();
  }

  get userID {
    return _prefs.getInt('userID') ?? 0;
  }

  set userID(int value) {
    _prefs.setInt('userID', value);
  }

  get lastPage {
    return _prefs.getString('lastPage') ?? 'login';
  }

  set lastPage(String value) {
    _prefs.setString('lastPage', value);
  }

  get hearRateID {
    return _prefs.getInt('hearRateID');
  }

  set hearRateID(int value) {
    _prefs.setInt('hearRateID', value);
  }

  get temperatureID {
    return _prefs.getInt('temperatureID');
  }

  set temperatureID(int value) {
    _prefs.setInt('temperatureID', value);
  }

  get oxygenID {
    return _prefs.getInt('oxygenID');
  }

  set oxygenID(int value) {
    _prefs.setInt('oxygenID', value);
  }
}
