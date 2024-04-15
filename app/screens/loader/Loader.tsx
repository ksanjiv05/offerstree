import {StyleSheet, View, useWindowDimensions} from 'react-native';
import React from 'react';
import LoaderKit from 'react-native-loader-kit';
import {Circle, Path, Svg} from 'react-native-svg';

export default function Loader() {
  return (
    <View style={styles.container}>
      <LoaderKit color="green" name="BallScale" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loader: {height: 100, width: 100},
});

const LoaderX = () => {
  const {width} = useWindowDimensions();
  const ww = width * 1.7;
  const r = ww / 2;
  const jiva = width * 0.8;

  // const path = `M ${r} ${r} m 0 -${r} a ${r} ${r} 0 1 1 0 ${
  //   2 * r
  // } a ${r} ${r} 0 1 1 0 -${2 * r}`;
  const a = (r * r + r * r - jiva * jiva) / (2 * r * r);
  const c = Math.acos(a);
  const last = Math.PI - c;

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number,
  ) => {
    const angleInRadians = Math.PI + angleInDegrees; //((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const a3 = (last - c) / 3;
  const cartesian = polarToCartesian(r, r, r, c);
  const cartesian2 = polarToCartesian(r, r, r, last);

  const cartesian3 = polarToCartesian(r, r, r, last - a3);
  const cartesian4 = polarToCartesian(r, r, r, last - 2 * a3);

  console.log('diffrence ', last - c, last, c, a3);
  const path = `M ${ww / 2} ${ww / 2}`;

  function getPath(p1x, p1y, p2x, p2y, t) {
    p1y = p1y + 10;
    p2y = p2y + 10;

    // mid-point of line:
    var mpx = (p2x + p1x) * 0.5;
    var mpy = (p2y + p1y) * 0.5;

    // angle of perpendicular to line:
    var theta = Math.atan2(p2y - p1y, p2x - p1x) - Math.PI / 2;

    // distance of control point from mid-point of line:
    var offset = 15;

    // location of control point:
    var c1x = mpx + offset * Math.cos(theta);
    var c1y = mpy + offset * Math.sin(theta);

    // show where the control point is:
    // var c1 = document.getElementById('cp');
    // c1.setAttribute('cx', c1x);
    // c1.setAttribute('cy', c1y);

    // construct the command to draw a quadratic curve
    var curve =
      'M' + (p1x+3) + ' ' + p1y + ' Q ' + c1x + ' ' + c1y + ' ' + (p2x-3) + ' ' + p2y;
    return curve;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: ww,
          height: ww,
          backgroundColor: '#fff',
          borderRadius: width * 1.72,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: ww * 0.8,
            height: ww * 0.8,
            backgroundColor: '#fff000',
            borderRadius: width * 1.72,
          }}></View>
      </View>
      <Svg
        style={{
          width: ww,
          height: ww,
          // backgroundColor: '#fff',
          position: 'absolute',
        }}
        // rotation={-90}
      >
        <Path
          d={getPath(cartesian.x, cartesian.y, cartesian4.x, cartesian4.y, 0)}
          stroke="red"
          fill={'none'}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <Path
          d={getPath(cartesian4.x, cartesian4.y, cartesian3.x, cartesian3.y, 0)}
          stroke="red"
          fill={'none'}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <Path
          d={getPath(cartesian3.x, cartesian3.y, cartesian2.x, cartesian2.y, 0)}
          stroke="red"
          fill={'none'}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* <Circle cx={cartesian.x} cy={cartesian.y + 10} r="10" fill="red" />
        <Circle cx={cartesian2.x} cy={cartesian2.y+10} r="10" fill="green" />
        <Circle cx={cartesian3.x} cy={cartesian3.y+10} r="10" fill="blue" />
        <Circle cx={cartesian4.x} cy={cartesian4.y+10} r="10" fill="yellow" /> */}
      </Svg>
    </View>
  );
};

export default Loader;
