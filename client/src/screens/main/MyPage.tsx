import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import MainTitle from '../../components/text/MainTitle';
import { colors } from '../../theme/colors';
import { Bold, Light, Regular } from '../../theme/fonts';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import ColoredScrollView from '../../components/view/ColoredScrollView';
import { CommonModal, CommonModalTitle } from '../../components/modal/CommonModal';
import CommonModalButton from '../../components/button/CommonModalButton';
import { useDispatch, useSelector } from 'react-redux';
import { clearAll } from '../../store/actions/propsAction';
import { RootState } from '../../store/reducers';
import useRequestSms from '../../hooks/useRequestSms';
import { useToast } from 'react-native-toast-notifications';
import { ASSIST_SERVER_URL } from '@env';
import axios, { AxiosResponse } from 'axios';
import { UserTeams } from '../../../@types/global/types';

const PhoneContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0px 10px 0px;
`;

const ChangeButton = styled.TouchableOpacity`
  width: 90px;
  height: 28px;
  background-color: ${colors.blue};
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;

const Seperator = styled.View`
  margin: 25px 0px;
  border: 0.8px;
  border-color: ${colors.lightGray};
`;

const MenuButton = styled.TouchableOpacity`
  margin: 12px 0px;
  padding: 0px 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Line = styled.View`
  margin-top: 15px;
  margin-bottom: 35px;
`;

export default function MyPage() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { phone, name, provider, token } = useSelector((state: RootState) => state.userReducer);
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(clearAll());
    });
    return unsubscribe;
  }, [navigation, dispatch]);

  const requestSms = useRequestSms({ phone });

  const showErrorModal = () => {
    setModalVisible(true);
  };

  const hideErrorModal = () => {
    setModalVisible(false);
  };

  const goToChangePassword = async () => {
    if (provider === 'kakao') {
      return toast.show('????????? ????????? ????????? ??? ??? ????????????.', { type: 'danger' });
    }
    try {
      await requestSms();
      navigation.navigate('ChangePassword', { screenName: 'MyPage_Main', phone });
    } catch (error) {
      console.log(error);
    }
  };

  const checkCanDelete = async () => {
    try {
      const { data }: AxiosResponse<UserTeams> = await axios.get(`${ASSIST_SERVER_URL}/user/team`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (data.length === 0) {
        navigation.navigate('DeleteAccount_1');
      } else {
        showErrorModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changePassword = () => {
    if (provider === 'kakao') {
      return toast.show('????????? ????????? ?????? ??? ??? ????????????.', { type: 'danger' });
    }
    navigation.navigate('NewPhone');
  };

  return (
    <>
      <CommonModal visible={modalVisible} setVisible={hideErrorModal}>
        <CommonModalTitle>
          <Bold size={17}>????????? ??? ????????????.</Bold>
          <Line>
            <Regular gray size={13}>
              ????????? ?????? ????????? ????????? ???????????????.
            </Regular>
          </Line>
        </CommonModalTitle>
        <CommonModalButton text="????????????  >" onPress={hideErrorModal} />
      </CommonModal>
      <ColoredScrollView titleColor={colors.white}>
        <MainTitle marginBottom="5px">
          <>
            <Bold size={22}>{name}</Bold>
            <Light size={22}>???</Light>
          </>
          <Light size={22}>??????????????? ????</Light>
        </MainTitle>
        <>
          <PhoneContainer>
            <Regular>{phone}</Regular>
            <ChangeButton onPress={() => changePassword()}>
              <Regular size={14} white>
                ????????????
              </Regular>
            </ChangeButton>
          </PhoneContainer>
          <Seperator />
          <MenuButton onPress={() => navigation.navigate('MyProfile')}>
            <Regular>??? ?????????</Regular>
            <MaterialIcons name="keyboard-arrow-right" size={23} color={colors.gray} />
          </MenuButton>
          <MenuButton onPress={() => goToChangePassword()}>
            <Regular>???????????? ?????????</Regular>
            <MaterialIcons name="keyboard-arrow-right" size={23} color={colors.gray} />
          </MenuButton>
          <Seperator />
          <MenuButton onPress={() => navigation.navigate('CustomerService')}>
            <Regular gray>????????????</Regular>
            <MaterialIcons name="keyboard-arrow-right" size={23} color={colors.gray} />
          </MenuButton>
          <MenuButton onPress={() => navigation.navigate('LogOutSelect')}>
            <Regular lightGray>????????????</Regular>
            <MaterialIcons name="keyboard-arrow-right" size={23} color={colors.gray} />
          </MenuButton>
          <MenuButton onPress={() => checkCanDelete()}>
            <Regular lightGray>????????????</Regular>
            <MaterialIcons name="keyboard-arrow-right" size={23} color={colors.gray} />
          </MenuButton>
        </>
      </ColoredScrollView>
    </>
  );
}
