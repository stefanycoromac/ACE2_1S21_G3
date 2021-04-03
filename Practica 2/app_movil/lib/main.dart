import 'package:flutter/material.dart';

import 'package:app_movil/theme.dart';
import 'package:app_movil/src/blocs/provider.dart';
import 'package:app_movil/src/preferences/user_prefecence.dart';

import 'package:app_movil/src/pages/login_page.dart';
import 'package:app_movil/src/pages/dashboard_page.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final prefs = new UserPreference();
  await prefs.initPrefs();

  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Provider(
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Health app',
        initialRoute: 'login',
        routes: {
          'login': (BuildContext context) => LoginPage(),
          'dashboard': (BuildContext context) => DashBoardPage(),
        },
        // theme: theme(),
      ),
    );
  }
}
