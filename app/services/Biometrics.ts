import ReactNativeBiometrics from 'react-native-biometrics';

export interface IsSensorAvailableResult {
  available: boolean;
  biometryType?: BiometryType;
  error?: string;
}
export interface CreateKeysResult {
  publicKey: string;
}
export interface BiometricKeysExistResult {
  keysExist: boolean;
}
export interface DeleteKeysResult {
  keysDeleted: boolean;
}
export interface CreateSignatureResult {
  success: boolean;
  signature?: string;
  error?: string;
}
export interface SimplePromptResult {
  success: boolean;
  error?: string;
}

export type BiometryType = 'TouchID' | 'FaceID' | 'Biometrics';

export interface IBiometrics {
  checkIsBiometricsAvailable(): Promise<IsSensorAvailableResult>;
  createKeys(): Promise<CreateKeysResult>;
  checkIsKeysGenerate(): Promise<BiometricKeysExistResult>;
  deleteKeys(): Promise<DeleteKeysResult>;
  createSignature(
    promptMessage: string,
    payload: string,
  ): Promise<CreateSignatureResult>;
  simplePromt(
    promptMessage: string,
    fallbackPromptMessage?: string,
  ): Promise<SimplePromptResult>;
}

class Biometrics implements IBiometrics {
  private rnBiometrics = new ReactNativeBiometrics();

  checkIsBiometricsAvailable = async () => {
    const resultObject = await this.rnBiometrics.isSensorAvailable();
    return resultObject;
  };

  createKeys = async () => {
    const resultObject = await this.rnBiometrics.createKeys();
    return resultObject;
  };

  checkIsKeysGenerate = async () => {
    const resultObject = await this.rnBiometrics.biometricKeysExist();
    return resultObject;
  };

  deleteKeys = async () => {
    const resultObject = await this.rnBiometrics.deleteKeys();
    return resultObject;
  };

  createSignature = async (promptMessage: string, payload: string) => {
    const resultObject = await this.rnBiometrics.createSignature({
      promptMessage,
      payload,
    });
    return resultObject;
  };

  simplePromt = async (
    promptMessage: string,
    fallbackPromptMessage?: string,
  ) => {
    const resultObject = await this.rnBiometrics.simplePrompt({
      promptMessage,
      fallbackPromptMessage,
    });
    return resultObject;
  };
}

export const biometrics = new Biometrics();
