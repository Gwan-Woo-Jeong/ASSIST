import React from 'react';
import { useDispatch } from 'react-redux';
import { NextMatch } from '../../../@types/global/types';
import AddOnsCard from '../../components/card/AddOnsCard';
import FakeNextMatchCard from '../../components/card/FakeNextMatchCard';
import NextMatchCard from '../../components/card/NextMatchCard';
import LoggedInHeader from '../../components/header/LoggedInHeader';
import BubbleView from '../../components/view/BubbleView';
import CardScrollView from '../../components/view/CardScrollView';
import ShadeView from '../../components/view/ShadeView';
import useEditProfile from '../../hooks/useEditProfile';
import useOnLayout from '../../hooks/useOnLayout';
import useReset from '../../hooks/useReset';
import { changeRole } from '../../store/actions/userAction';
import { Bold, Regular } from '../../theme/fonts';

export default function QuickTips_12() {
  const { layout, onLayout } = useOnLayout();
  const dispatch = useDispatch();
  const goToPrevious = useReset({ screenName: 'QuickTips_11' });
  const editProfile = useEditProfile({ role: 'complete' });
  const reset = useReset({ screenName: 'User' });

  const goToNext = async () => {
    await editProfile();
    dispatch(changeRole('complete'));
    reset();
  };

  const dummyData: NextMatch = {
    id: 1,
    date: '2021-08-18',
    day: '수',
    startTime: '18:00',
    endTime: '20:00',
    address: '서울특별시 용산구 용산대로12번길',
    address2: '3, 4층',
    condition: '인원 모집 중',
    reason: '',
    deadline: '',
    vote: false,
  };

  return (
    <>
      <LoggedInHeader isTestTeam />
      <CardScrollView home>
        <NextMatchCard onLayout={onLayout} conditions="인원 모집 중" nextMatch={dummyData} />
        <AddOnsCard />
      </CardScrollView>
      {layout ? (
        <ShadeView>
          <FakeNextMatchCard layout={layout} />
          <BubbleView
            layout={layout}
            title="다음 경기: ② 등록 후"
            description={
              <Regular>
                경기가 등록되면 이렇게 표시 된답니다!{'\n'}
                <Bold>[투표하기]</Bold>를 누르면 상세한 정보를 볼 수 있어요. 경기 일정 등록, 이제
                직접 하실 수 있겠죠?
              </Regular>
            }
            pointerLeftVal={25}
            onPressNext={goToNext}
            onPressPrevious={goToPrevious}
            nextBtnText="완료"
          />
        </ShadeView>
      ) : (
        <ShadeView />
      )}
    </>
  );
}
