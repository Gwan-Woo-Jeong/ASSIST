/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FontSource } from 'expo-font';

export const fontsToLoad: [
  { 'SpoqaHanSansNeo-Bold': FontSource },
  { 'SpoqaHanSansNeo-Light': FontSource },
  { 'SpoqaHanSansNeo-Medium': FontSource },
  { 'SpoqaHanSansNeo-Regular': FontSource },
  { 'SpoqaHanSansNeo-Thin': FontSource },
] = [
  { 'SpoqaHanSansNeo-Bold': require('./fonts/SpoqaHanSansNeo-Bold.otf') },
  { 'SpoqaHanSansNeo-Light': require('./fonts/SpoqaHanSansNeo-Light.otf') },
  { 'SpoqaHanSansNeo-Medium': require('./fonts/SpoqaHanSansNeo-Medium.otf') },
  { 'SpoqaHanSansNeo-Regular': require('./fonts/SpoqaHanSansNeo-Regular.otf') },
  { 'SpoqaHanSansNeo-Thin': require('./fonts/SpoqaHanSansNeo-Thin.otf') },
];

export const imagesToLoad = [
  require('./images/big-logo.png'),
  require('./images/font-logo.png'),
  require('./images/small-logo.png'),
  require('./images/IntroPage_1.png'),
  require('./images/IntroPage_2.png'),
  require('./images/IntroPage_3.png'),
  require('./images/IntroPage_4.png'),
  require('./images/IntroPage_5.png'),
  require('./images/NotFound.png'),
  require('./images/bank-busan.png'),
  require('./images/bank-daegu.png'),
  require('./images/bank-gwangju.png'),
  require('./images/bank-IBK.png'),
  require('./images/bank-jeil.png'),
  require('./images/bank-kakao.png'),
  require('./images/bank-kbank.png'),
  require('./images/bank-kookmin.png'),
  require('./images/bank-nonghyup.png'),
  require('./images/bank-saemaeul.png'),
  require('./images/bank-sanup.png'),
  require('./images/bank-shinhan.png'),
  require('./images/bank-shinhyup.png'),
  require('./images/bank-suhyup.png'),
  require('./images/bank-toss.png'),
  require('./images/bank-woochekuk.png'),
  require('./images/bank-woori.png'),
];
