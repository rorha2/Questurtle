# 🐢 Questurtle DATA

> Questurtle에서 사용하는 주요 데이터 구조

---

# point

현재 보유 포인트

자료형

number

예시

1250

---

# history

포인트 사용 내역

자료형

array

예시

[
    "+100 P (출석 보상)",
    "-300 P (상점 구매)"
]

---

# quests

퀘스트 목록

자료형

array

예시

[
    {
        id: "drink_water",
        title: "물 2L 마시기",
        reward: 100,
        type: "daily",
        completed: false
    }
]

---

# Quest 객체

id

퀘스트 고유 ID

중복 불가

예시

drink_water

---

title

퀘스트 이름

예시

물 2L 마시기

---

reward

보상 포인트

자료형

number

예시

100

---

type

퀘스트 종류

daily

매일 초기화되는 반복 퀘스트

challenge

장기간 진행되는 목표

special

특별히 생성되는 퀘스트

---

completed

완료 여부

true

완료

false

미완료

---

# lastAttendance

마지막 출석 날짜

자료형

string

예시

2026-07-09

---

# lastQuestReset

마지막 일일 퀘스트 초기화 날짜

자료형

string

예시

2026-07-09