import React from 'react';
import styled from 'styled-components/native';
import { Bold, Light } from '../../theme/fonts';
import CommonModalButton from '../../components/button/CommonModalButton';
import { colors } from '../../theme/colors';
import { useDispatch } from 'react-redux';
import { changeRole } from '../../store/actions/userAction';
import useEditProfile from '../../hooks/useEditProfile';
import useReset from '../../hooks/useReset';

const Container = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
  padding: 0px 20px;
`;

const CheckMark = styled.View`
  margin-bottom: 30px;
`;

const BoldText = styled(Bold)`
  margin-bottom: 5px;
`;

const LightText = styled(Light)`
  margin-bottom: 5px;
`;

const LastText = styled(Light)`
  margin-bottom: 30px;
`;

export default function LandingPage_8() {
  const dispatch = useDispatch();
  const editProfile = useEditProfile({ role: 'tips' });
  const reset = useReset({ screenName: 'QuickTips' });

  const goToNext = async () => {
    await editProfile();
    dispatch(changeRole('tips'));
    reset();
  };

  return (
    <Container>
      <CheckMark>
        <Bold size={100}>π</Bold>
      </CheckMark>
      <BoldText>
        νμκ°μμ μλ£ <Light>νμ΄μ!</Light>
      </BoldText>
      <LightText>μ λλ νμ΄ λΌμ΄ν,</LightText>
      <LastText>μ΄μμ€νΈμ ν¨κ» μμν΄ λ³ΌκΉμ?</LastText>
      <CommonModalButton text="λ€, μ’μμ π" color="blue" onPress={() => goToNext()} />
    </Container>
  );
}
