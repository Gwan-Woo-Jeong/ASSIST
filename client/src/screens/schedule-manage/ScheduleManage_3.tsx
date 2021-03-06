import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import NextPageView from '../../components/view/NextPageView';
import NextButton from '../../components/button/NextButton';
import MainTitle from '../../components/text/MainTitle';
import { Bold, Light, Regular } from '../../theme/fonts';
import SubTitle from '../../components/text/SubTitle';
import CounterButton from '../../components/button/CounterButton';
import { RootState } from '../../store/reducers';
import { addScheduleManage } from '../../store/actions/propsAction';

const TitleSpaceContents = styled.View`
  width: 100%;
  height: 64px;
`;

const CounterContainer = styled.View`
  height: 7%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CounterLeftTitle = styled.View`
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const CounterRightTitle = styled.View`
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export default function ScheduleManage_3() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const { date } = useSelector((state: RootState) => state.propsReducer.scheduleManage);
  const matchDate = new Date(date);
  const year = matchDate.getFullYear();
  const month = matchDate.getMonth();
  const day = matchDate.getDate();
  const [counter, setCounter] = useState(1);

  const onPress = () => {
    dispatch(
      addScheduleManage({
        deadline: new Date(year, month, day + 1 - counter).toISOString().slice(0, 10),
      }),
    );
    navigation.navigate('ScheduleManage_4');
  };

  const getCounter = (counter: number) => {
    setCounter(counter);
  };

  return (
    <>
      <NextPageView>
        <MainTitle>
          <Bold size={22}>
            ?????? ?????? ??????<Light size={22}>???</Light>
          </Bold>
          <Light size={22}>????????? ?????????</Light>
        </MainTitle>
        <SubTitle>
          <Light size={14}>?????? ?????? ??? ?????? ????????? ????????? ????????? ????????? ???????????????</Light>
        </SubTitle>
        <TitleSpaceContents />
        <CounterContainer>
          <CounterLeftTitle>
            <Regular>?????? ??????</Regular>
          </CounterLeftTitle>
          <CounterButton counter={counter} getCounter={getCounter} text=" ??????" type="day" />
          <CounterRightTitle>
            <Regular>??????</Regular>
          </CounterRightTitle>
        </CounterContainer>
      </NextPageView>
      <NextButton disabled={false} onPress={onPress} />
    </>
  );
}
