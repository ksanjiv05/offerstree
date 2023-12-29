import React from 'react';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '../../theme/ThemeContext';
import styleSheet from './styles';
import AuthContainer from '../../components/organisms/container/AuthContainer';
import {loginHomeImg} from '../../assets/images';
import FormInput from '../../components/atoms/input';
import TextButton from '../../components/atoms/button';
import Space from '../../components/atoms/space';
import AnimatedTitle from '../../components/molecules/animated/title';
import {FaceIDIcon, FacebookIcon, GoogleIcon, XIcon} from '../../assets/icons';

type Props = {};

const Login = ({navigation}: Props) => {
  const theme = useTheme();
  const styles = styleSheet(theme);
  return (
    <AuthContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentCenter}>
          <Image source={loginHomeImg} resizeMode="cover" style={styles.img} />
        </View>
        <View style={styles.loginContainer}>
          <AnimatedTitle text="Login" />
          <Space height={35} />

          <FormInput value={'Email'} onChange={() => {}} />
          <Space height={15} />
          <FormInput value={'Password'} onChange={() => {}} />
          <Space height={25} />
          <View style={styles.rowConatiner}>
            <View>
              <Text style={{color: '#fff'}}>You don't have account?</Text>
              <Pressable onPress={() => navigation.navigate('register')}>
                <Text style={styles.registerText}>Register</Text>
              </Pressable>
            </View>
            <View style={{width: 100}}>
              <TextButton
                labelButton="Login"
                onPress={() => {}}
              />
            </View>
          </View>
        </View>
        <Space height={25} />

        <View style={[styles.rowConatiner, {justifyContent: 'space-evenly'}]}>
          <TouchableOpacity onPress={() => {}}>
            <GoogleIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <XIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <FacebookIcon />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AuthContainer>
  );
};

export default Login;
