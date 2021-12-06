import React, { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';

import MainTitle from '../../components/text/MainTitle';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import ColoredScrollView from '../../components/view/ColoredScrollView';
import CloseHeader from '../../components/header/CloseHeader';
import { CommonModal, CommonModalTitle } from '../../components/modal/CommonModal';
import CommonModalButton from '../../components/button/CommonModalButton';
import CommonButton from '../../components/button/CommonButton';

const CardSpaceCard = styled.View`
  width: 100%;
  height: 35px;
`;

const CardDotLineCard = styled.View`
  border: 1px dotted ${colors.lightGray};
`;

const ContentsSpaceContents = styled.View`
  width: 100%;
  height: 50px;
`;

const ButtonSpaceButton = styled.View`
  width: 100%;
  height: 8px;
`;

const TextSpaceText = styled.View`
  width: 100%;
  height: 8px;
`;

const Line = styled.View`
  margin-top: 13px;
  margin-bottom: 35px;
`;

const ModalSpace = styled.View`
  width: 100%;
  height: 16px;
`;

const ContentContainer = styled.View`
  flex: 1;
`;

const MatchInfoContainer = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;

const MatchInfoTitle = styled.View`
  flex: 1;
`;

const MatchInfoContents = styled.View`
  flex: 4;
`;

const MatchInfoDetailStadium = styled(Regular)`
  font-size: 17px;
  color: ${colors.gray};
`;

const VoteContainer = styled.View`
  flex: 1;
`;

const Vote = styled.TouchableOpacity`
  flex: 1;
  padding: 16px;
  border: 1px solid ${colors.lightGray};
`;

const MercenaryContainer = styled.View`
  flex: 1;
`;
const MercenaryTitle = styled(Regular)`
  color: ${colors.blue};
  font-size: 13px;
`;

export default function MatchVote_2() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onSubmit = (data: string) => {
    console.log(data);
  };

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleMatchConfirmed = () => {
    console.log('만들 예정');
  };

  return (
    <>
      <CommonModal visible={modalVisible} setVisible={handleModalOpen}>
        <CommonModalTitle>
          <Bold size={17}>경기 확정</Bold>
          <Line>
            <Regular gray size={13}>
              경기 확정 시, 팀원에게 알람을 보냅니다.
            </Regular>
          </Line>
        </CommonModalTitle>
        <CommonModalButton color="blue" text="확정하기" onPress={handleMatchConfirmed} />
        <ModalSpace />
        <CommonModalButton color="transparent" text="돌아가기 >" onPress={handleModalClose} />
      </CommonModal>
      <CloseHeader color={colors.lightGray} />
      <ColoredScrollView isCard={true} titleColor={colors.lightGray}>
        <MainTitle marginBottom="15px">
          <Bold size={22}>투표 완료 👍</Bold>
        </MainTitle>
        <ContentContainer>
          <MatchInfoContainer>
            <MatchInfoTitle>
              <Bold size={20}>경기 정보</Bold>
            </MatchInfoTitle>
            <ContentsSpaceContents />
            <MatchInfoContents>
              <Regular size={17}>2021-08-18(수)</Regular>
              <TextSpaceText />
              <Bold size={20}>
                시작 18:00 <AntDesign name="arrowright" size={20} /> 20:00 종료
              </Bold>
              <TextSpaceText />
              <MatchInfoDetailStadium>서울 동대문구 천호대로 133</MatchInfoDetailStadium>
              <TextSpaceText />
              <MatchInfoDetailStadium>홈플러스 동대문점 옥상층 HM풋살파크</MatchInfoDetailStadium>
            </MatchInfoContents>
          </MatchInfoContainer>
          <CardSpaceCard />
          <CommonModalButton color="blue" text="경기 확정 >" onPress={handleModalOpen} />
          <CardSpaceCard />
          <CardDotLineCard />
          <CardSpaceCard />
          <VoteContainer>
            <Vote>
              <Regular size={17}>😍 참석</Regular>
            </Vote>
            <ButtonSpaceButton />
            <Vote>
              <Regular size={17}>😭 불참</Regular>
            </Vote>
            <ButtonSpaceButton />
            <Vote>
              <Regular size={17}>😱 미정</Regular>
            </Vote>
            <ButtonSpaceButton />
            <Vote>
              <Regular size={17}>😡 미응답</Regular>
            </Vote>
          </VoteContainer>
          <CardSpaceCard />
          <MercenaryContainer>
            <CommonButton
              width="100%"
              height="50px"
              buttonBgColor={colors.white}
              buttonBorder={colors.blue}
              buttonRadius="15px"
              onPress={() => {
                console.log('용병구하기');
              }}>
              <MercenaryTitle>용병 구하기</MercenaryTitle>
            </CommonButton>
            <ModalSpace />
            <CommonModalButton
              color="transparent"
              text="자세히 보기 >"
              onPress={() => console.log('자세히 보기')}
            />
            <ModalSpace />
          </MercenaryContainer>
        </ContentContainer>
      </ColoredScrollView>
    </>
  );
}
