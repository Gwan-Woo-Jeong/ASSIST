import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import styled from 'styled-components/native';
import FakeTeamSelector from '../../components/button/FakeTeamSelector';
import Menu from '../../components/button/Menu';
import AddOnsCard from '../../components/card/AddOnsCard';
import NoMatchCard from '../../components/card/NoMatchCard';
import HeaderContainer from '../../components/header/HeaderContainer';
import TopContainer from '../../components/header/TopContainer';
import BubbleView from '../../components/view/BubbleView';
import CardScrollView from '../../components/view/CardScrollView';
import ShadeView from '../../components/view/ShadeView';
import useOnLayout from '../../hooks/useOnLayout';
import useReset from '../../hooks/useReset';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';

const BottomContainer = styled.View`
  flex-direction: row;
  padding: 0px 20px;
  margin-bottom: 10px;
  height: 30px;
`;

const TeamSelector = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 113px;
`;

const TeamName = styled(Bold)`
  color: ${colors.blue};
  font-size: 17px;
  margin-right: 2px;
`;

export default function QuickTips_9() {
  const { layout, onLayout } = useOnLayout();
  const goToNext = useReset({ screenName: 'QuickTips_10' });
  const goToPrevious = useReset({ screenName: 'QuickTips_7' });

  return (
    <>
      <HeaderContainer>
        <TopContainer>
          <Menu isTestLeader />
        </TopContainer>
        <BottomContainer>
          <TeamSelector onLayout={onLayout}>
            <TeamName>FC 살쾡이</TeamName>
            <MaterialIcons name="keyboard-arrow-down" size={24} color={colors.blue} />
          </TeamSelector>
          <TeamSelector>
            <TeamName style={{ color: colors.lightGray }}>용병활동</TeamName>
          </TeamSelector>
        </BottomContainer>
      </HeaderContainer>
      <CardScrollView home>
        <NoMatchCard isLeader />
        <AddOnsCard />
      </CardScrollView>
      {layout ? (
        <ShadeView>
          <FakeTeamSelector isTeamSelect layout={layout} />
          <BubbleView
            layout={layout}
            title="팀 선택"
            description={
              <Regular>
                팀 이름을 누르면, 소속된 다른 팀으로 이동할 수 있어요. 새로운 팀을 등록하거나 가입할
                수도 있구요!
              </Regular>
            }
            pointerLeftVal={25}
            onPressNext={goToNext}
            onPressPrevious={goToPrevious}
          />
        </ShadeView>
      ) : (
        <ShadeView />
      )}
    </>
  );
}
