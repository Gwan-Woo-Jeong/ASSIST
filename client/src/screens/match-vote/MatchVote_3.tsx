import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';
import MainTitle from '../../components/text/MainTitle';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import ColoredScrollView from '../../components/view/ColoredScrollView';
import CloseHeader from '../../components/header/CloseHeader';
import CommonModalButton from '../../components/button/CommonModalButton';
import { StackScreenProps } from '@react-navigation/stack';

const MainTitleSpaceContents = styled.View`
  height: 35px;
`;

const TextSpaceText = styled.View`
  height: 8px;
`;

const CardSpaceButton = styled.View`
  height: 35px;
`;

const ButtonSpaceButton = styled.View`
  height: 12px;
`;

const DottedLine = styled.View`
  margin-top: 30px;
  margin-bottom: 30px;
  border: 1.2px dotted ${colors.lightGray};
`;

const ContentContainer = styled.View`
  width: 100%;
`;

const MainTitleText = styled(Bold)`
  color: ${colors.blue};
  font-size: 22px;
`;

const MatchInfoDetailStadium = styled(Regular)`
  font-size: 15px;
  color: ${colors.gray};
`;

const Vote = styled.View`
  padding: 16px;
  background-color: ${colors.whiteSmoke};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const VoteSelected = styled(Vote)`
  background-color: ${colors.blue};
`;

const Space = styled.View`
  height: 5px;
`;

type MatchVoteProps = StackScreenProps<RootStackParamList, 'MatchVote_3'>;

export default function MatchVote_3({ route }: MatchVoteProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleDetailVote = () => {
    navigation.navigate('MatchVote_6');
  };

  const getAttendView = () => {
    if (route.params?.data?.vote === 'attend') {
      return (
        <VoteSelected>
          <Bold white>😍 참석</Bold>
          <Bold white>{route.params?.data?.attend.length}명</Bold>
        </VoteSelected>
      );
    } else {
      return (
        <Vote>
          <Regular gray>😍 참석</Regular>
          <Regular gray>{route.params?.data?.attend.length}명</Regular>
        </Vote>
      );
    }
  };

  const getAbsentView = () => {
    if (route.params?.data?.vote === 'absent') {
      return (
        <VoteSelected>
          <Bold white>😭 불참</Bold>
          <Bold white>{route.params?.data?.absent.length}명</Bold>
        </VoteSelected>
      );
    } else {
      return (
        <Vote>
          <Regular gray>😭 불참</Regular>
          <Regular gray>{route.params?.data?.absent.length}명</Regular>
        </Vote>
      );
    }
  };

  return (
    <>
      <CloseHeader color={colors.lightBlue} />
      <ColoredScrollView isCard={true} titleColor={colors.lightBlue}>
        <MainTitle marginBottom="15px">
          <MainTitleText>경기 확정 🎉🎉</MainTitleText>
        </MainTitle>
        <ContentContainer>
          <Bold size={20}>경기 정보</Bold>
          <MainTitleSpaceContents />
          <Regular size={17}>
            {route.params?.data?.date}({route.params?.data?.day})
          </Regular>
          <TextSpaceText />
          <Bold size={17}>
            시작 {route.params?.data?.startTime} <AntDesign name="arrowright" size={17} />{' '}
            {route.params?.data?.endTime} 종료
          </Bold>
          <TextSpaceText />
          <MatchInfoDetailStadium>{route.params?.data?.address}</MatchInfoDetailStadium>
          <TextSpaceText />
          <MatchInfoDetailStadium>{route.params?.data?.address2}</MatchInfoDetailStadium>
          <CardSpaceButton />
          <CommonModalButton
            onPress={() => console.log('용병 구하기')}
            height={55}
            text="용병 구하기  >"
            color="transparent"
            blueText
          />
          <DottedLine />
          {getAttendView()}
          <ButtonSpaceButton />
          {getAbsentView()}
          <CardSpaceButton />
          <CommonModalButton
            height={55}
            grayText
            color="transparent"
            text="자세히 보기 >"
            onPress={handleDetailVote}
          />
          <Space />
        </ContentContainer>
      </ColoredScrollView>
    </>
  );
}
