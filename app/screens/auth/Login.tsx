import React from 'react';
import {
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
import {FacebookIcon, GoogleIcon, XIcon} from '../../assets/icons';
import {toastMessage} from '../../services/ToastMessage';
import {login} from '../../apis/auth';
import {setItem} from '../../utils/storage';
import axios from 'axios';

type Props = {
  navigation: any;
};

const Login = ({navigation}: Props) => {
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });

  const onChange = (name: string, value: string) => {
    setUser({...user, [name]: value});
  };

  const handleSubmit = () => {
    if (!user.email || user.email === '') {
      toastMessage.publish({type: 'error', title: 'Please enter your email'});
      return;
    }
    if (!user.password || user.password === '') {
      toastMessage.publish({
        type: 'error',
        title: 'Please enter your password',
      });
      return;
    }

    // api call
    login({...user, login_type: 'password'})
      .then(res => {
        console.log(res.data, res.data?.data);
        toastMessage.publish({type: 'success', title: 'Login success'});
        setItem('user', res.data?.data.user);
        setItem('token', res.data?.data.token);
        setItem('expiresIn', res.data?.data.expiresIn);
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${res.data?.data.token}`;
        if (res) {
          navigation.navigate('offer-explore');
        }
      })
      .catch(err => {
        console.log(err);
        toastMessage.publish({type: 'error', title: 'Login failed'});
      });
  };

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

          <FormInput
            value={user?.email}
            placeholder="Email"
            onChange={text => onChange('email', text)}
          />
          <Space height={15} />
          <FormInput
            value={user?.password}
            placeholder="Password"
            secureTextEntry={true}
            onChange={text => onChange('password', text)}
          />
          <Space height={25} />
          <View style={styles.rowConatiner}>
            <View>
              <Text style={{color: '#fff'}}>You don't have account?</Text>
              <Pressable onPress={() => navigation.navigate('register')}>
                <Text style={styles.registerText}>Register</Text>
              </Pressable>
            </View>
            <View style={{width: 100}}>
              <TextButton labelButton="Login" onPress={handleSubmit} />
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
