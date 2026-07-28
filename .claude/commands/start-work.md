---
description: 이슈 번호로 연결된 브랜치를 만들고 체크아웃한다
argument-hint: <issue-number>
allowed-tools: Bash(gh issue view:*), Bash(gh issue develop:*)
---

이슈 `#$ARGUMENTS`에 연결된 브랜치를 만들고 체크아웃한다. 브랜치명은 `<prefix>/issue-$ARGUMENTS` 형식을 쓴다.

1. 이슈 라벨을 확인해 prefix를 정한다.

```bash
gh issue view $ARGUMENTS --json labels -q '.labels[].name'
```

- `bug` 라벨이 있으면 `fix`, 그 외에는 `feat`.

2. 브랜치를 만들고 체크아웃한다.

```bash
gh issue develop $ARGUMENTS --checkout --name "<prefix>/issue-$ARGUMENTS"
```

- 이슈 번호가 주어지지 않으면 실행하지 말고 사용자에게 번호를 물어본다.
- 명령 실행 후 어떤 브랜치로 체크아웃됐는지 한 줄로 알려준다.
