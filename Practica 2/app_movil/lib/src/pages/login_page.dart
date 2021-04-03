import 'package:flutter/material.dart';

import 'package:app_movil/src/blocs/provider.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();

  final List<String> errors = [];

  Size _size;
  String _nickname;
  String _password;
  UserBloc _userBloc;

  @override
  Widget build(BuildContext context) {
    _userBloc = Provider.userBloc(context);
    _size = MediaQuery.of(context).size;

    _nickname = '';
    _password = '';

    return Scaffold(
      body: SafeArea(
        child: Center(child: _body(context)),
      ),
    );
  }

  Widget _body(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: _getProportionateWidth(20.0)),
      child: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            Text(
              '¡Bienvenido de nuevo!',
              style: TextStyle(
                color: Colors.black,
                fontSize: _getProportionateWidth(28.0),
                fontWeight: FontWeight.bold,
              ),
            ),
            Text(
              'Inicie sesión con su usuario y contraseña',
              textAlign: TextAlign.center,
            ),
            SizedBox(height: _size.height * 0.08),
            _signForm(),
          ],
        ),
      ),
    );
  }

  Widget _signForm() {
    return Form(
      key: _formKey,
      child: Column(
        children: <Widget>[
          _userField(),
          SizedBox(height: _getProportionateHeight(30.0)),
          _passwordField(),
          SizedBox(height: _getProportionateHeight(30.0)),
          _customButton('Ingresar'),
        ],
      ),
    );
  }

  TextFormField _userField() {
    return TextFormField(
      keyboardType: TextInputType.text,
      decoration: InputDecoration(
        labelText: 'Usuario',
        hintText: 'Ingresa tu usuario',
        floatingLabelBehavior: FloatingLabelBehavior.always,
        suffixIcon: _customIcon(Icons.alternate_email),
      ),
      onSaved: (value) => _nickname = value,
      validator: (value) {
        if (value.length <= 0) return 'Debes ingresar un usuario';
        return null;
      },
    );
  }

  TextFormField _passwordField() {
    return TextFormField(
      obscureText: true,
      decoration: InputDecoration(
        labelText: 'Contraseña',
        hintText: 'Ingresa tu contraseña',
        floatingLabelBehavior: FloatingLabelBehavior.always,
        suffixIcon: _customIcon(Icons.lock_outline),
      ),
      onSaved: (value) => _password = value,
      validator: (value) {
        if (value.length <= 0) return 'Debes ingresar tu contraseña';
        return null;
      },
    );
  }

  Padding _customIcon(IconData icon) {
    return Padding(
      padding: EdgeInsets.fromLTRB(
        0.0,
        _getProportionateWidth(20.0),
        _getProportionateWidth(20.0),
        _getProportionateWidth(20.0),
      ),
      child: Icon(
        icon,
        color: Colors.grey,
        size: _getProportionateWidth(20.0),
      ),
    );
  }

  SizedBox _customButton(String text) {
    return SizedBox(
      width: double.infinity,
      height: _getProportionateHeight(56.0),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20.0),
          ),
        ),
        child: Text(
          text,
          style: TextStyle(
            fontSize: _getProportionateWidth(18.0),
            color: Colors.white,
          ),
        ),
        onPressed: _submit,
      ),
    );
  }

  void _submit() async {
    if (!_formKey.currentState.validate()) return;

    _formKey.currentState.save();
    final value = await _userBloc.login(_nickname, _password);

    if (!value) {
      _snackbar('El nombre de usuario y la contraseña '
          'que ingresaste no coinciden con nuestros registros');
      return;
    }

    Navigator.pushReplacementNamed(context, 'dashboard');
  }

  void _snackbar(String mensaje) {
    final snackbar = SnackBar(
      content: Text(mensaje),
      duration: Duration(milliseconds: 2500),
    );

    ScaffoldMessenger.of(context).showSnackBar(snackbar);
  }

  double _getProportionateHeight(double inputHeight) {
    return (inputHeight / 812.0) * _size.height;
  }

  double _getProportionateWidth(double inputWidth) {
    return (inputWidth / 375.0) * _size.width;
  }
}
