import React from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '../../theme/ThemeContext';
import styleSheet from './styles';
import AuthContainer from '../../components/organisms/container/AuthContainer';
import FormInput from '../../components/atoms/input';
import TextButton from '../../components/atoms/button';
import Switch from '../../components/atoms/switch';
import Space from '../../components/atoms/space';
import AnimatedTitle from '../../components/molecules/animated/title';
import {
  EyeOffIcon,
  EyeOnIcon,
  FacebookIcon,
  GoogleIcon,
  XIcon,
} from '../../assets/icons';
import {toastMessage} from '../../services/ToastMessage';
import {isValidEmail} from '../../config/isValidEmail';
import {register} from '../../apis/auth';

type Props = {
  navigation: any;
};

type UserProps = {
  mobile?: string;
  password?: string;
  name?: string;
  email?: string;
  has_store?: boolean;
};

const Register = ({navigation}: Props) => {
  const theme = useTheme();
  const styles = styleSheet(theme);
  const [user, setUser] = React.useState<UserProps>();
  const [isSecure, setIsSecure] = React.useState<boolean>(true);
  const [hasStore, setHasStore] = React.useState<boolean>(false);

  const onChange = (name: string, value: string) => {
    setUser({...user, [name]: value});
  };

  const handleRegister = () => {
    console.log(user);
    if (!user?.name) {
      toastMessage.publish({type: 'error', title: 'Please enter your name'});
      return;
    }
    if (!user?.mobile) {
      toastMessage.publish({type: 'error', title: 'Please enter your mobile'});
      return;
    }
    if (!(user?.email && isValidEmail(user?.email))) {
      toastMessage.publish({
        type: 'error',
        title: 'Please enter your valid email',
      });
      return;
    }
    if (!user?.password) {
      toastMessage.publish({
        type: 'error',
        title: 'Please enter your password',
      });
      return;
    }
    register({...user, confirm_password: user?.password})
      .then(res => {
        toastMessage.publish({
          type: 'success',
          title: 'User registered successfully',
        });
        console.log(res);
      })
      .catch(err => {
        toastMessage.publish({
          type: 'error',
          title: 'User registration failed',
        });
        console.log(err);
      });
  };

  return (
    <AuthContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.loginContainer}>
          <Space height={35} />
          <AnimatedTitle text="Register" />
          <Space height={35} />
          <FormInput
            value={user?.name}
            placeholder="Full Name"
            onChange={text => onChange('name', text)}
          />
          <Space height={15} />

          <FormInput
            value={user?.mobile}
            maxLength={10}
            keyboardType="phone-pad"
            placeholder="Mobile Number"
            onChange={text => onChange('mobile', text)}
          />
          <Space height={15} />

          <FormInput
            value={user?.email}
            keyboardType="email-address"
            placeholder="Email Address"
            onChange={text => onChange('email', text)}
          />
          <Space height={15} />
          <View>
            <FormInput
              value={user?.password}
              secureTextEntry={isSecure}
              placeholder="Password"
              onChange={text => onChange('password', text)}
            />
            <TouchableOpacity
              onPress={() => setIsSecure(!isSecure)}
              style={styles.eyeContainer}>
              {!isSecure ? <EyeOffIcon /> : <EyeOnIcon />}
            </TouchableOpacity>
          </View>
          <Space height={25} />

          <View style={styles.rowConatiner}>
            <View>
              <Text style={{color: '#fff'}}>
                Do you want to create a store?
              </Text>
              <Space height={5} />
              <View style={styles.switchContainer}>
                <Switch
                  isActive={hasStore}
                  onPress={() => setHasStore(p => !p)}
                />
                {/* <Switch /> */}
              </View>
            </View>
          </View>
          <Space height={15} />

          <View style={styles.rowConatiner}>
            <View>
              <Text style={{color: '#fff'}}>You already have account?</Text>
              <Pressable onPress={() => navigation.navigate('login')}>
                <Text style={styles.registerText}>Register</Text>
              </Pressable>
            </View>
            <View style={{width: 100}}>
              <TextButton labelButton="Register" onPress={handleRegister} />
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

export default Register;
