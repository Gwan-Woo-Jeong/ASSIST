import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import MainTitle from '../../components/text/MainTitle';
import NextPageView from '../../components/view/NextPageView';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import SkipButton from '../../components/button/SkipButton';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { Bold, Light, Regular } from '../../theme/fonts';
import { MaterialIcons } from '@expo/vector-icons';
import KakaoButton from '../../components/button/KakaoButton';
import * as Clipboard from 'expo-clipboard';
import { useToast } from 'react-native-toast-notifications';
import { StackScreenProps } from '@react-navigation/stack';
import useTeamCode from '../../hooks/useTeamCode';
import LoadingView from '../../components/view/LoadingView';
import useInviteKakao from '../../hooks/useKakaoInvite';
import useInviteSms from '../../hooks/useSmsInvite';
import { CommonModal, CommonModalTitle } from '../../components/modal/CommonModal';
import CommonModalButton from '../../components/button/CommonModalButton';

const CodeContainer = styled.TouchableOpacity`
  width: 100%;
  height: 90px;
  padding: 10px 12px 10px 8px;
  background-color: ${colors.whiteSmoke};
  margin-top: 70px;
  justify-content: space-between;
`;

const CodeTitle = styled(Regular)`
  color: ${colors.darkGray};
`;

const FlexBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonContainer = styled.View`
  margin-top: 50px;
  height: 130px;
  justify-content: space-between;
`;

const Line = styled.View`
  margin-top: 13px;
  margin-bottom: 35px;
`;

const ButtonSpace = styled.View`
  height: 12px;
`;

type AddOnsProps = StackScreenProps<RootStackParamList, 'AddOns_4'>;

export default function AddOns_4({ route }: AddOnsProps) {
  const { data, isLoading } = useTeamCode({ inviteCode: route.params?.inviteCode || '' });
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const toast = useToast();
  const inviteKakao = useInviteKakao({
    teamName: data?.name,
    inviteCode: data?.inviteCode,
    leader: data?.leaderName,
  });
  const inviteSms = useInviteSms({
    teamName: data?.name,
    inviteCode: data?.inviteCode,
    leader: data?.leaderName,
  });

  const inviteCode = String(route.params?.inviteCode);

  const copyToClipboard = () => {
    Clipboard.setString(inviteCode);
    toast.show('??????????????? ?????????????????????.');
  };

  const hideErrorModal = () => {
    setModalVisible(false);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  return isLoading ? (
    <LoadingView />
  ) : (
    <>
      <CommonModal visible={modalVisible} setVisible={hideErrorModal}>
        <CommonModalTitle>
          <Bold size={17}>?????? ???????????? ?????????????????????.</Bold>
          <Line>
            <Regular gray size={13}>
              ????????? ????????? ?????? ???????????? ???????????????.
            </Regular>
          </Line>
        </CommonModalTitle>
        <CommonModalButton color="blue" text="????????? ????????? ??????  >" onPress={() => inviteSms()} />
        <ButtonSpace />
        <CommonModalButton text="????????????  >" onPress={hideErrorModal} />
      </CommonModal>
      <NextPageView>
        <MainTitle>
          <Light size={22}>????????? ?????????</Light>
          <Bold size={22}>?????? ??? ????????? ????</Bold>
        </MainTitle>
        <CodeContainer onPress={copyToClipboard}>
          <CodeTitle>??? ?????? ??????</CodeTitle>
          <FlexBox>
            <Bold size={22}>{inviteCode}</Bold>
            <MaterialIcons name="content-copy" size={24} color={colors.gray} />
          </FlexBox>
        </CodeContainer>
        <ButtonContainer>
          <KakaoButton text="?????????????????? ????????????  >" isKakao onPress={() => inviteKakao()} />
          <KakaoButton
            text="?????????????????? ????????????  >"
            isKakao={false}
            onPress={() => showModal()}
          />
        </ButtonContainer>
      </NextPageView>
      <SkipButton text="????????? ???????????????" onPress={() => navigation.goBack()} />
    </>
  );
}
