import 'package:flutter/material.dart';

import 'package:flutter_svg/flutter_svg.dart';

class DashBoardPage extends StatefulWidget {
  DashBoardPage({Key key}) : super(key: key);

  @override
  _DashBoardPageState createState() => _DashBoardPageState();
}

class _DashBoardPageState extends State<DashBoardPage> {
  Size _size;

  @override
  Widget build(BuildContext context) {
    _size = MediaQuery.of(context).size;

    return Scaffold(
      appBar: AppBar(
        title: _header('ACTIVITY', 'Show All'),
        backgroundColor: Colors.white,
      ),
      body: SafeArea(
        child: Center(child: _buildDashboardCards()),
      ),
    );
  }

  Widget _buildDashboardCards() {
    return SingleChildScrollView(
      child: Container(
        width: double.infinity,
        child: Column(
          children: [
            _header('ACTIVITY', 'Show All'),
            _buildCard(
              color1: Color(0xffF3BBEC),
              color2: Color(0xff0eaeb4),
              color3: Color(0xff533DC6),
              color4: Color(0xffc4bbcc),
              value: 0.8,
              iconPath: 'assets/icons/footprints.svg',
              metricType: 'Steps',
              metricCount1: '3500',
              metricCount2: '860',
            ),
            _buildCard(
              color1: Color(0xffF3BBEC),
              color2: Color(0xff0eaeb4),
              color3: Color(0xff533DC6),
              color4: Color(0xffc4bbcc),
              value: 0.8,
              iconPath: 'assets/icons/footprints.svg',
              metricType: 'Steps',
              metricCount1: '3500',
              metricCount2: '860',
            ),
          ],
        ),
      ),
    );
  }

  Widget _header(String text1, String text2) {
    return Container(
      width: _size.width * 0.9,
      margin: EdgeInsets.symmetric(vertical: _size.height * 0.02),
      child: Row(
        children: <Widget>[
          Text(
            text1,
            style: TextStyle(
              color: Color(0xff39439f),
              fontWeight: FontWeight.bold,
              fontSize: 20.0,
            ),
          ),
          Expanded(child: Container()),
          Text(
            text2,
            style: TextStyle(
              color: Color(0xffF3BBEC),
              fontWeight: FontWeight.bold,
              fontSize: 16,
            ),
          )
        ],
      ),
    );
  }

  Widget _buildCard(
      {Color color1,
      Color color2,
      Color color3,
      Color color4,
      String metricType,
      String metricCount1,
      String metricCount2,
      double value,
      String iconPath}) {
    return Container(
      height: _size.height * 0.3,
      width: _size.width * 0.9,
      margin: EdgeInsets.symmetric(vertical: _size.height * 0.01),
      decoration: BoxDecoration(
        color: Color(0xff39439f),
        borderRadius: BorderRadius.circular(20.0),
      ),
      child: Stack(
        children: <Widget>[
          Align(
            alignment: Alignment.topRight,
            child: Container(
              height: _size.height * 0.12,
              width: _size.width * 0.23,
              decoration: BoxDecoration(
                color: color1,
                borderRadius: BorderRadius.only(
                  bottomLeft: Radius.circular(130.0),
                  topRight: Radius.circular(20.0),
                ),
              ),
            ),
          ),
          Align(
            alignment: Alignment.bottomCenter,
            child: Container(
              margin: EdgeInsets.only(bottom: 20.0),
              child: CircleAvatar(
                backgroundColor: color2,
                radius: _size.width * 0.08,
              ),
            ),
          ),
          Align(
            alignment: Alignment.centerLeft,
            child: Container(
              height: _size.height * 0.12, // 12% of screen
              width: _size.width * 0.10, // 23% of width of screen
              decoration: BoxDecoration(
                color: color3,
                borderRadius: BorderRadius.only(
                  topRight: Radius.circular(_size.width * 0.05),
                  bottomRight: Radius.circular(_size.width * 0.05),
                ),
              ),
            ),
          ),
          Positioned(
            top: _size.height * 0.10,
            left: _size.width * 0.16,
            child: CircleAvatar(
              backgroundColor: color4,
              radius: _size.width * 0.02,
            ),
          ),
          Positioned(
            bottom: _size.height * 0.05,
            right: _size.width * 0.10,
            child: CircleAvatar(
              backgroundColor: color4,
              radius: _size.width * 0.06,
            ),
          ),
          Positioned(
            top: _size.height * 0.03,
            left: _size.width * 0.06,
            child: Container(
              child: Row(
                children: [
                  SvgPicture.asset(
                    iconPath,
                    height: _size.height * 0.05,
                  ),
                  SizedBox(
                    width: _size.height * 0.01,
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        metricType,
                        style: TextStyle(color: Color(0xffF3BBEC)),
                      ),
                      Text(
                        metricCount1,
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 25.0,
                        ),
                      )
                    ],
                  ),
                ],
              ),
            ),
          ),
          Align(
            alignment: Alignment.center,
            child: Container(
              height: _size.height * 0.015,
              width: _size.width * 0.75,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(10.0),
                child: LinearProgressIndicator(
                  value: value,
                  valueColor: AlwaysStoppedAnimation(Colors.white),
                  backgroundColor: Color(0xffc4bbcc).withOpacity(0.2),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
