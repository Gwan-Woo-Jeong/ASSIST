import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import MainTitle from '../../components/text/MainTitle';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import ColoredScrollView from '../../components/view/ColoredScrollView';
import CloseHeader from '../../components/header/CloseHeader';
import CommonModalButton from '../../components/button/CommonModalButton';
import NextButton from '../../components/button/NextButton';
import TeamMemberCard from '../../components/card/TeamMeberCard';
import { RootState } from '../../store/reducers';
import LoadingView from '../../components/view/LoadingView';
import { CommonModal, CommonModalTitle } from '../../components/modal/CommonModal';
import axios from 'axios';
import { ASSIST_SERVER_URL } from '@env';
import { useToast } from 'react-native-toast-notifications';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';

const HeaderSpaceButton = styled.View`
  width: 100%;
  height: 35px;
`;

const ButtonSpaceContents = styled.View`
  width: 100%;
  height: 35px;
`;

const Space = styled.View`
  width: 100%;
  height: 16px;
`;

const ContentContainer = styled.View`
  width: 100%;
`;

const Line = styled.View`
  margin-top: 13px;
  margin-bottom: 35px;
`;

export default function AddOns_2({ route }: any) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { token, id } = useSelector((state: RootState) => state.userReducer);
  const { nowLeaderId } = useSelector((state: RootState) => state.propsReducer.newLeader);
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    count: 0,
    users: [
      {
        id: 0,
        email: '',
        name: '',
        phone: '',
        gender: '',
        provider: '',
        role: '',
        teamName: '',
        inviteCode: '',
      },
    ],
    leaderId: 0,
  });
  const [newLeaderId, setNewLeaderId] = useState(data?.leaderId);
  useEffect(() => {
    const navi = () => {
      if (!token) {
        // ???????????? ?????????????????? ??????????????? // ?????? ???????????? ????????? ????????? ?????????
        // ??????????????? ?????????????????? ?????? ????????????????????? ????????? ?????????
        return navigation.replace('Guest', { screen: 'GetStarted' });
      }
      if (route.params.teamId) {
        axios
          .get(`${ASSIST_SERVER_URL}/team/${route.params.teamId}/member`, {
            headers: { authorization: `Bearer ${token}` },
          })
          .then((el) => {
            setData(el.data);
            setIsLoading(false);
          })
          .catch((err) => {
            //????????? ?????? ????????? ???????????????
            navigation.replace('NotFound');
          });
      }
    };
    navi();
    return () => {
      setIsLoading(true);
    };
  }, []);
  const [modalVisible, setModalVisible] = useState(false);

  const onSubmit = (data: string) => {
    console.log(data);
  };

  const handleLeaderOpenModal = () => {
    setModalVisible(true);
  };

  const handleLeaderCloseModal = () => {
    setModalVisible(false);
  };

  const handleChangeLeaderId = async (nowLeaderId: number) => {
    try {
      await axios.patch(
        `${ASSIST_SERVER_URL}/team/${route.params.teamId}`,
        {
          leaderId: `${nowLeaderId}`,
        },
        { headers: { authorization: `Bearer ${token}` } },
      );
      navigation.replace('AddOns_2', { teamId: String(route.params?.teamId) });
      toast.show('?????? ????????? ?????? ???????????????.');
    } catch (err) {
      console.log(err);
    }
  };

  const getNewLeaderId = (newLeaderId: number) => {
    setNewLeaderId(newLeaderId);
  };

  return isLoading ? (
    <LoadingView />
  ) : (
    <>
      <CommonModal visible={modalVisible} setVisible={handleLeaderCloseModal}>
        <CommonModalTitle>
          <Bold size={17}>?????? ??????</Bold>
          <Line>
            <Regular gray size={13}>
              ????????? ?????????????????????????
            </Regular>
          </Line>
        </CommonModalTitle>
        <CommonModalButton
          color="blue"
          text="?????? ?????? ??????"
          onPress={() => handleChangeLeaderId(nowLeaderId)}
        />
        <Space />
        <CommonModalButton
          color="whiteSmoke"
          text="?????? ???????????? >"
          onPress={handleLeaderCloseModal}
        />
      </CommonModal>
      <CloseHeader color={colors.whiteSmoke} />
      <ColoredScrollView titleColor={colors.whiteSmoke}>
        <MainTitle marginBottom="15px">
          <Bold size={22}>??? ?????????</Bold>
          <Regular size={17}>{data.users[0].teamName}</Regular>
        </MainTitle>
        <ContentContainer>
          <HeaderSpaceButton />
          <CommonModalButton
            color="blue"
            text="+ ?????? ????????????"
            onPress={() =>
              navigation.navigate('AddOns_4', { inviteCode: data?.users[0].inviteCode })
            }
          />
          <ButtonSpaceContents />
          <TeamMemberCard
            data={data}
            teamId={route.params.teamId}
            newLeaderId={newLeaderId}
            getNewLeaderId={getNewLeaderId}
          />
        </ContentContainer>
      </ColoredScrollView>
      {newLeaderId === 0 ? (
        <></>
      ) : (
        <NextButton
          text="?????? ?????? ?????? >"
          onPress={() => {
            handleLeaderOpenModal();
          }}
        />
      )}
    </>
  );
}
