import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import LineInput from '../../components/input/LineInput';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { Bold, Light } from '../../theme/fonts';
import NextPageView from '../../components/view/NextPageView';
import NextButton from '../../components/button/NextButton';
import MainTitle from '../../components/text/MainTitle';
import SubTitle from '../../components/text/SubTitle';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SkipButton from '../../components/button/SkipButton';
import axios, { AxiosResponse } from 'axios';
import { ASSIST_SERVER_URL } from '@env';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { getSelectedTeam } from '../../store/actions/userAction';

const schema = yup.object({
  dues: yup.string().required(),
});

export default function CreateTeam_4() {
  const {
    control,
    formState: { isValid },
    getValues,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const [errorMessage, setErrorMessage] = useState('');
  const clearErrorMessage = () => setErrorMessage('');
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const createTeam = (dues?: { dues: string }) => {
    axios
      .post(
        `${ASSIST_SERVER_URL}/team`,
        { ...state.propsReducer.createTeam, ...dues },
        { headers: { authorization: `Bearer ${state.userReducer.token}` } },
      )
      .then(({ data: { id, inviteCode } }: AxiosResponse<{ id: number; inviteCode: string }>) => {
        dispatch(getSelectedTeam({ id, name: state.propsReducer.createTeam.name, leader: true }));
        navigation.navigate('CreateTeam_5', { inviteCode });
      })
      .catch((error) => console.log(error));
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <>
      <NextPageView>
        <MainTitle>
          <>
            <Bold size={22}>?????? ??? ??????</Bold>
            <Light size={22}>???</Light>
          </>
          <Light size={22}>???????????????? ????</Light>
        </MainTitle>
        <SubTitle>
          <Light>?????? ?????? 1??????, ??????????????? ?????? ????????? ???????????????.</Light>
        </SubTitle>
        <LineInput
          type="money"
          control={control}
          title="??? ?????? ??????"
          name="dues"
          placeholder="?????? ????????? ??????????????????"
          errorMessage={errorMessage}
          clearErrorMessage={clearErrorMessage}
        />
      </NextPageView>
      <SkipButton onPress={() => createTeam()} />
      <NextButton
        disabled={!isValid || Boolean(errorMessage)}
        onPress={() => createTeam({ dues: String(getValues('dues')) })}
      />
    </>
  );
}
