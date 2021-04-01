import 'package:flutter/material.dart';

import 'package:app_movil/src/blocs/user_bloc.dart';
export 'package:app_movil/src/blocs/user_bloc.dart';

class Provider extends InheritedWidget {
  static Provider _instancia;

  final _userBloc = new UserBloc();

  factory Provider({Key key, Widget child}) {
    if (_instancia == null) {
      _instancia = new Provider._internal(key: key, child: child);
    }
    return _instancia;
  }

  Provider._internal({Key key, Widget child}) : super(key: key, child: child);

  // Provider({Key key, Widget child}) : super(key: key, child: child);

  @override
  bool updateShouldNotify(covariant InheritedWidget oldWidget) => true;

  static UserBloc userBloc(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<Provider>()._userBloc;
  }
}
