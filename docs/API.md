# 🐢 Questurtle API

> Questurtle에서 사용하는 주요 함수 목록

---

# point.js

## updatePoint()

포인트를 화면에 표시한다.

추가로 localStorage에도 저장한다.

---

## givePoint(amount, reason)

포인트를 지급한다.

### 매개변수

- amount : 지급할 포인트
- reason : 지급 사유

### 자동 실행

- point 증가
- 포인트 화면 갱신
- 내역 추가
- localStorage 저장

예시

givePoint(100, "출석 보상")

---

## usePoint(amount, reason)

포인트를 차감한다.

### 매개변수

- amount : 사용할 포인트
- reason : 사용 사유

### 자동 실행

- point 감소
- 포인트 화면 갱신
- 내역 추가
- localStorage 저장

예시

usePoint(500, "상점 구매")

---

# storage.js

## updateHistory()

포인트 내역을 화면에 표시한다.

최신 내역부터 출력한다.

추가로 localStorage에도 저장한다.

---

## saveQuests()

퀘스트 완료 상태를 저장한다.

저장 방식

id → completed

예시

{
    "drink_water": true,
    "exercise": false
}

---

## loadQuests()

저장된 퀘스트 완료 상태를 불러온다.

id를 기준으로 연결한다.

---

# quest.js

## updateQuest()

퀘스트 화면을 다시 그린다.

자동으로

- 특별 퀘스트
- 일일 퀘스트
- 도전 퀘스트

순으로 출력한다.

type 값을 기준으로 분류한다.

---

## completeQuest(index)

퀘스트 완료 처리.

### 자동 실행

- completed = true
- 포인트 지급
- 저장
- 화면 갱신

---

# ui.js

## hideAll()

모든 화면을 숨긴다.

사용 화면

- 홈
- 포인트
- 퀘스트
- 상점

---

# app.js

## checkAttendance()

오늘 출석 여부를 확인한다.

오늘 처음 실행이라면

- 출석 포인트 지급
- 출석 날짜 저장

---

## resetDailyQuests()

날짜가 바뀌면

daily 타입 퀘스트만

completed = false
로 변경한다.

자동으로 저장한다.