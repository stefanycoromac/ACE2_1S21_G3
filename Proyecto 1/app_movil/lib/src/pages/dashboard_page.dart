import 'package:flutter/material.dart';

import 'package:liquid_progress_indicator/liquid_progress_indicator.dart';

class DashBoardPage extends StatefulWidget {
  DashBoardPage({Key key}) : super(key: key);

  @override
  _DashBoardPageState createState() => _DashBoardPageState();
}

class _DashBoardPageState extends State<DashBoardPage> {
  Size size;

  @override
  Widget build(BuildContext context) {
    size = MediaQuery.of(context).size;

    return Scaffold(
      body: PageView(
        scrollDirection: Axis.vertical,
        children: <Widget>[
          _page('Ritmo cardíaco'),
          _page('Temperatura'),
          _page('Oxigeno'),
        ],
      ),
    );
  }

  Widget _page(String title) {
    final estiloTexto = TextStyle(color: Colors.white, fontSize: 50.0);
    return Container(
      color: Color.fromRGBO(40, 42, 54, 1.0),
      child: SafeArea(
        child: Column(
          children: <Widget>[
            Expanded(child: Container()),
            Text(title, style: estiloTexto),
            Expanded(child: Container()),
            _percentIndicator(),
            Expanded(child: Container()),
            Icon(Icons.keyboard_arrow_down, size: 70.0, color: Colors.white)
          ],
        ),
      ),
    );
  }

  Widget _percentIndicator() {
    return Container(
      height: size.width * 0.85,
      width: size.width * 0.85,
      child: LiquidCircularProgressIndicator(
        value: 50 / 100,
        valueColor: AlwaysStoppedAnimation(Colors.pink),
        backgroundColor: Colors.white,
        borderColor: Colors.pink,
        borderWidth: 10.0,
        direction: Axis.vertical,
        center: Text(
          '50%',
          style: TextStyle(
            fontSize: 50.0,
            fontWeight: FontWeight.w600,
            color: Colors.black,
          ),
        ),
      ),
    );
  }
}
