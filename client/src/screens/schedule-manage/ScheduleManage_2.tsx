import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { RootStackParamList } from '../../navigation/RootStackParamList';
import NextPageView from '../../components/view/NextPageView';
import NextButton from '../../components/button/NextButton';
import LineSelect from '../../components/input/LineSelect';
import MainTitle from '../../components/text/MainTitle';
import { Bold, Light } from '../../theme/fonts';
import LineInput from '../../components/input/LineInput';
import { addScheduleManage } from '../../store/actions/propsAction';

const schema = yup.object({
  detailAddr: yup.string(),
});

type ScheduleManageProps = StackScreenProps<RootStackParamList, 'ScheduleManage_2'>;

export default function ScheduleManage_2({ route }: ScheduleManageProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const { control, getValues } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [isPressed, setIsPressed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (isPressed) {
        setIsPressed(false);
      }
    });
    return unsubscribe;
  }, [navigation, isPressed]);

  const clearErrorMessage = () => setErrorMessage('');

  const handleStadium = () => {
    setIsPressed(true);
    navigation.navigate('StadiumSelect', { modal: true, stadiumAddr: '' });
  };

  return (
    <>
      <NextPageView>
        <MainTitle>
          <Bold size={22}>
            경기 장소<Light size={22}>를</Light>
          </Bold>
          <Light size={22}>입력해 주세요 🏟</Light>
        </MainTitle>
        <LineSelect
          title="주소"
          isPressed={isPressed}
          selected={route.params?.stadiumAddr}
          onPress={() => handleStadium()}
        />
        <LineInput
          control={control}
          title="상세주소"
          name="detailAddr"
          placeholder="직접입력"
          errorMessage={errorMessage}
          clearErrorMessage={clearErrorMessage}
        />
      </NextPageView>
      <NextButton
        disabled={!route.params?.stadiumAddr || Boolean(errorMessage)}
        onPress={() => {
          dispatch(
            addScheduleManage({
              address: String(route.params?.stadiumAddr),
              address2: String(getValues('detailAddr')),
            }),
          );
          navigation.navigate('ScheduleManage_3');
        }}
      />
    </>
  );
}
