import { Injectable } from '@nestjs/common';
import { getManager, getRepository } from 'typeorm';
import { MakeM } from 'src/common/naver_sens/make_M_template';
import { NaverSensService } from 'src/common/naver_sens/sens.service';
import { getDate } from 'src/common/getDate';
import { Match } from 'src/match/match.entity';
import { M019dto, M010dto, T009dto } from 'src/common/naver_sens/dto/template.dto';
import { MakeU } from 'src/common/naver_sens/make_U_template';
import { MakeT } from 'src/common/naver_sens/make_T_template';
import { convertSMS } from 'src/common/naver_sens/convert_SMS_template';

@Injectable()
export class KakaoAlimService {
  makeM = new MakeM();
  makeT = new MakeT();
  naverSensService = new NaverSensService();
  async sendM012() {
    let nextday = getDate(1);

    const queryString = `SELECT b.name, b.phone,b.provider, d.name as team, c.id,c.date,c.startTime,c.endTime, c.deadline, c.address,c.address2
      FROM user_match as a join user as b on b.id = a.userId
      join assist.match as c on c.id = a.matchId join team as d on d.id = c.teamId 
      where c.deadline = '${nextday}' and a.condition in ('미응답','미정') and c.condition = '인원 모집 중' `;

    // 메세지 보낼 대상들.
    let data: [] = await getManager().query(queryString);

    console.log(data);
    if (data.length) {
      const kakaoArr = [];
      const smsArr = [];
      data.forEach(
        ({
          name,
          phone,
          team,
          date,
          startTime,
          endTime,
          deadline,
          address,
          address2,
          id,
          provider,
        }) => {
          const form = this.makeM.M012(phone, {
            matchId: id,
            name,
            team,
            date,
            startTime,
            endTime,
            deadline,
            address,
            address2,
          });

          if (provider === 'kakao') {
            kakaoArr.push(kakaoArr);
          } else {
            smsArr.push(convertSMS(form));
          }
        },
      );

      if (kakaoArr.length) {
        this.naverSensService.sendKakaoAlarm('M012', kakaoArr);
      }
      if (smsArr.length) {
        this.naverSensService.sendGroupSMS(smsArr);
      }
    }
  }

  async sendM003() {
    let nextday = getDate(1);

    const queryString = `SELECT b.name, b.phone,b.provider , d.name as team, c.id,c.date,c.startTime,c.endTime, c.deadline, c.address,c.address2
    FROM user_match as a join user as b on b.id = a.userId
    join assist.match as c on c.id = a.matchId join team as d on d.id = c.teamId 
    where c.deadline = '${nextday}' and a.condition in ('참석','불참') and c.condition = '인원 모집 중'`;

    // 메세지 보낼 대상들.
    let data: [] = await getManager().query(queryString);
    console.log(data);
    if (data.length) {
      const kakaoArr = [];
      const smsArr = [];
      data.forEach(
        ({
          name,
          phone,
          team,
          date,
          startTime,
          endTime,
          deadline,
          address,
          address2,
          id,
          provider,
        }) => {
          let form = this.makeM.M003(phone, {
            matchId: id,
            name,
            team,
            date,
            startTime,
            endTime,
            deadline,
            address,
            address2,
          });
          if (provider === 'kakao') {
            kakaoArr.push(kakaoArr);
          } else {
            smsArr.push(convertSMS(form));
          }
        },
      );
      if (kakaoArr.length) {
        this.naverSensService.sendKakaoAlarm('M012', kakaoArr);
      }
      if (smsArr.length) {
        this.naverSensService.sendGroupSMS(smsArr);
      }
    }
  }

  async autoFixMatchSendM006(data) {
    let kakaoArr = [];
    let smsArr = [];

    data.forEach((item) => {
      let attend = 0;
      let absent = 0;
      let arr2 = [];
      item.user_matchs.forEach((el) => {
        const payload: any = {
          matchId: el.id,
          team: item.team.name,
          startTime: item.startTime,
          endTime: item.endTime,
          address: item.address,
          address2: item.address2,
          date: item.date,
          to: el.user.phone,
          name: el.user.name,
          provider: el.user.provider,
        };
        if (el.condition === '참석') {
          attend++;
          payload.to = el.user.phone;
          payload.name = el.user.name;
          arr2.push(payload);
        } else if (el.condition === '미응답' || el.condition === '미정') {
          absent++;
          payload.to = el.user.phone;
          payload.name = el.user.name;
          arr2.push(payload);
        } else {
          absent++;
        }
      });

      arr2.forEach((el) => {
        el.attend = attend;
        el.absent = absent;
        let form = this.makeM.M006(el.to, el);

        if (el.provider === 'kakao') {
          kakaoArr.push(form);
        } else {
          smsArr.push(convertSMS(form));
        }
      });
    });

    if (kakaoArr.length) {
      this.naverSensService.sendKakaoAlarm('M006', kakaoArr);
    }
    if (smsArr.length) {
      this.naverSensService.sendGroupSMS(smsArr);
    }
  }

  async sendM006(data) {
    return this.autoFixMatchSendM006([data]);
  }

  async sendM007() {
    let nextday = getDate(1);

    let data: any = await getRepository(Match)
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.team', 'team')
      .leftJoinAndSelect('team.leaderId', 'leaderId')
      .leftJoinAndSelect('match.user_matchs', 'user_match')
      .leftJoinAndSelect('user_match.user', 'user')
      .where('match.date = :date', { date: nextday })
      .andWhere('match.condition = :condition', { condition: '인원 모집 중' })
      .getMany();

    if (!data.length) {
      return { message: '내일 예정 경기가 없습니다.' };
    }

    let kakaoArr = [];
    let smsArr = [];
    data.forEach((item) => {
      let attend = 0;
      let absent = 0;
      let arr2 = [];
      item.user_matchs.forEach((el) => {
        const payload: any = {
          matchId: item.id,
          team: item.team.name,
          startTime: item.startTime,
          endTime: item.endTime,
          address: item.address,
          address2: item.address2,
          date: item.date,
          leader: item.team.leaderId.name,
          to: item.team.leaderId.phone,
          provider: el.user.provider,
        };
        arr2.push(payload);
        if (el.condition === '찬성') {
          attend++;
        } else {
          absent++;
        }
      });
      arr2.forEach((el) => {
        el.attend = attend;
        el.absent = absent;
        let form = this.makeM.M007(el.to, el);

        if (el.provider === 'kakao') {
          kakaoArr.push(form);
        } else {
          smsArr.push(convertSMS(form));
        }
      });
    });
    if (kakaoArr.length) {
      this.naverSensService.sendKakaoAlarm('M007', kakaoArr);
    }

    if (smsArr.length) {
      this.naverSensService.sendGroupSMS(smsArr);
    }
  }

  async sendM008(data, beforeCondi, afterCondi) {
    const to = data.team.leaderId.phone;
    const payload = {
      matchId: data.id,
      team: data.team.name,
      startTime: data.startTime,
      endTime: data.endTime,
      address: data.address,
      address2: data.address2,
      date: data.date,
      name: data.user_matchs[0].user.name,
      leader: data.team.leaderId.name,
      before: beforeCondi,
      after: afterCondi,
    };
    const form = this.makeM.M008(to, payload);
    if (data.team.leaderId.provider === 'kakao') {
      this.naverSensService.sendKakaoAlarm('M008', [form]);
    } else {
      this.naverSensService.sendGroupSMS([convertSMS(form)]);
    }
  }
  async sendM019(data) {
    const kakaoArr = [];
    const smsArr = [];
    const arr = [];
    data.user_matchs.forEach((el) => {
      if (el.condition === '참석' || el.condition === '미정' || el.condition === '미응답') {
        const payload: M019dto = {
          matchId: data.id,
          team: data.team?.name,
          startTime: data.startTime,
          endTime: data.endTime,
          address: data.address,
          address2: data.address2,
          date: data.date,
          name: el.user?.name,
          reason: data?.reason,
          to: el.user?.phone,
          provider: el.user?.provider,
        };
        arr.push(payload);
      }
    });
    arr.forEach((el) => {
      let form = this.makeM.M019(el.to, el);
      if (el.provider === 'kakao') {
        kakaoArr.push(form);
      } else {
        smsArr.push(convertSMS(form));
      }
    });
    if (kakaoArr.length) {
      this.naverSensService.sendKakaoAlarm('M019', kakaoArr);
    }
    if (smsArr.length) {
      this.naverSensService.sendGroupSMS(smsArr);
    }
  }

  async sendU002(user) {
    let makeU = new MakeU();
    let form = makeU.U002(user.phone);
    if (user.provider === 'kakao') {
      this.naverSensService.sendKakaoAlarm('U002', [form]);
    } else {
      this.naverSensService.sendGroupSMS([convertSMS(form)]);
    }
  }

  async sendM020(match, merceneryDto, user) {
    console.log('유저의 가입경로', user?.provider);
    if (user?.provider === 'kakao') {
      const payload: M010dto = {
        matchId: match.id,
        team: match.team.name,
        startTime: match.startTime,
        endTime: match.endTime,
        address: match.address,
        address2: match.address2,
        date: match.date,
        need: merceneryDto.needNumber,
        money: merceneryDto.money,
      };
      let form = this.makeM.M020(user.phone, payload);
      this.naverSensService.sendKakaoAlarm('M020', [form]);
    }
  }

  async sendT009() {
    let nextday = getDate(1).slice(-2);

    if (nextday[0] === '0') {
      nextday = nextday.slice(1);
    }

    let checkLastDays = getDate(2).slice(-2) === '01';
    let month = getDate().slice(5, 7);

    let whereQuery = `= ${nextday}`;
    if (month === '02' && nextday === '28' && checkLastDays) {
      whereQuery = `IN (28,29,30,32)`;
    } else if (month === '02' && nextday === '29' && checkLastDays) {
      whereQuery = `IN (29,30,32)`;
    } else if (checkLastDays) {
      whereQuery = `IN (${nextday},32)`;
    }

    const queryString = `SELECT t.name,t.accountBank,t.paymentDay,t.accountNumber,t.id,user.phone,user.provider FROM assist.team as t
    join user_team as ut on t.id = ut.teamId 
    join user on user.id = ut.userId where paymentDay ${whereQuery} and
    accountBank != '' and accountNumber != '' and dues != ''`;

    const data = await getManager().query(queryString);

    const kakaoArr = [];
    const smsArr = [];

    data.forEach((el) => {
      const payload: T009dto = {
        teamId: el.id,
        team: el.name,
        date: getDate(1),
        bank: el.accountBank,
        accountNumber: el.accountNumber,
      };

      const form = this.makeT.T009(el.phone, payload);
      if (el.provider === 'kakao') {
        kakaoArr.push(form);
      } else {
        smsArr.push(convertSMS(form));
      }
    });

    if (kakaoArr.length) {
      this.naverSensService.sendKakaoAlarm('T009', kakaoArr);
    }

    if (smsArr.length) {
      this.naverSensService.sendGroupSMS(smsArr);
    }
  }
}
