import 'package:app_movil/src/providers/user_provider.dart';

class UserBloc {
  final _userProvider = new UserProvider();

  dispose() {}

  Future<bool> login(String nickname, String password) async {
    return await _userProvider.login(nickname, password);
  }
}
