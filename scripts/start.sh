#!/bin/bash
cd /home/ubuntu/ASSIST/server/dist

export DATABASE_USERNAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USERNAME --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')
export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export NCP_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names NCP_SECRET --query Parameters[0].Value | sed 's/"//g')
export NCP_ACCESS=$(aws ssm get-parameters --region ap-northeast-2 --names NCP_ACCESS --query Parameters[0].Value | sed 's/"//g')
export SMS_URI=$(aws ssm get-parameters --region ap-northeast-2 --names SMS_URI --query Parameters[0].Value | sed 's/"//g')
export SMS_SERVICEID=$(aws ssm get-parameters --region ap-northeast-2 --names SMS_SERVICEID --query Parameters[0].Value | sed 's/"//g')
export HOST_PHONE=$(aws ssm get-parameters --region ap-northeast-2 --names HOST_PHONE --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start main.js