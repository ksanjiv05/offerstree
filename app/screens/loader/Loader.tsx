import {StyleSheet, View, useWindowDimensions} from 'react-native';
import React from 'react';
import LoaderKit from 'react-native-loader-kit';
import {Circle, Path, Svg} from 'react-native-svg';

// export default function Loader() {
//   return (
//     <View style={styles.container}>
//       <LoaderKit color="green" name="BallScale" style={styles.loader} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#000',
//   },
//   loader: {height: 100, width: 100},
// });

const Loader = () => {
  const {width, height} = useWindowDimensions();
  const ww = width * 1.7;
  const r = ww / 2;
  const jiva = width * 0.8;

  // const path = `M ${r} ${r} m 0 -${r} a ${r} ${r} 0 1 1 0 ${
  //   2 * r
  // } a ${r} ${r} 0 1 1 0 -${2 * r}`;
  const a = (r * r + r * r - jiva * jiva) / (2 * r * r);
  const c = Math.acos(a);
  console.log(c);
  const segmentAngle = c + c / 4;

  const last =  Math.PI - c;

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

  const cartesian = polarToCartesian(r, r, r, segmentAngle);
  const cartesian2 = polarToCartesian(r, r, r, last);
  console.log(cartesian);
  const path = `M ${ww / 2} ${ww / 2}`;
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
          d={path}
          fill="red"
          stroke="red"
          strokeWidth="88"
          strokeLinecap="round"
        />
        <Circle cx={cartesian.x} cy={cartesian.y} r="10" fill="red" />
        <Circle cx={cartesian2.x} cy={cartesian2.y} r="10" fill="green" />

      </Svg>
    </View>
  );
};

export default Loader;
