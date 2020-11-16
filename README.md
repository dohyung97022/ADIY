# ADIY

ads are expensive so do it yourself.

## [사업 계획서](기록/사업%20계획서.md)

## [진행기록](기록/진행기록.md)

## [부서](기록/부서)

### used dependencies

```cmd
npm add firebase
npm add dotenv
npm add react-router-dom
npm add chart.js
npm add react-chartjs-2
```

### .env

반드시 firebase를 위한 .env 파일을 생성한다.  
.env가 없으면 화면이 뜨지 않는다!  
backendpoint를 search, channels를 위해 2개 지정 (REACT_APP_BACKENDPOINT)

```env
REACT_APP_API_KEY=""
REACT_APP_AUTH_DOMAIN=""
REACT_APP_DATABASE_URL=""
REACT_APP_PROJECT_ID=""
REACT_APP_STORAGE_BUCKET=""
REACT_APP_MESSAGING_SENDER_ID=""
REACT_APP_APP_ID=""
REACT_APP_MEASUREMENT_ID=""
REACT_APP_BACKENDPOINT=""
```
