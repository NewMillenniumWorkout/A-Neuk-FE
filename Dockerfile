# 1. Node.js 베이스 이미지 설정 (빌드 단계)
FROM node:20 AS build

# 2. 작업 디렉토리 생성
WORKDIR /app

# 3. package.json과 package-lock.json 복사 후 의존성 설치
COPY package*.json ./
RUN npm install

# 4. 앱 소스 코드 복사
COPY . .

# 5. React 앱 빌드
RUN npm run build

# 6. 'serve'를 실행할 경량 이미지 설정 (프로덕션 단계)
FROM node:20-alpine as production

# 7. 전 단계에서 빌드된 파일을 /app/build로 복사
WORKDIR /app
COPY --from=build /app/build ./build

# 8. serve 패키지 설치
RUN npm install -g serve

# 9. 컨테이너 시작 시 명령어 설정
CMD ["serve", "-s", "build", "-l", "3000"]

# 10. 포트 노출
EXPOSE 3000
