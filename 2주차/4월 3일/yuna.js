/**
 * 문제 07: 방문 길이 **
 *
 * 문제 설명:
 * 게임 캐릭터를 4가지 명령어를 통해 움직이려 합니다. 명령어는 다음과 같습니다.
 * - U: 위쪽으로 한 칸 가기
 * - D: 아래쪽으로 한 칸 가기
 * - R: 오른쪽으로 한 칸 가기
 * - L: 왼쪽으로 한 칸 가기
 *
 * 캐릭터는 좌표평면의 (0, 0) 위치에서 시작합니다.
 * 좌표평면의 경계는 왼쪽 위(-5, 5), 왼쪽 아래(-5, -5),
 * 오른쪽 위(5, 5), 오른쪽 아래(5, -5)로 구성합니다.
 *
 * 예시:
 * - "ULURRDLLU"라는 명령어를 실행하면 캐릭터가 이동한 경로가 좌표평면에 표시됩니다.
 * - "LULLLLLLU"라는 명령어를 실행하면 일부 명령어는 캐릭터가 움직이고, 일부는 무시됩니다.
 *
 * 이 문제에서는 캐릭터가 처음 걸어본 길의 길이를 구하려고 합니다.
 * 캐릭터가 지나간 길 중 처음 걸어본 길의 길이만 측정하고,
 * 이미 걸어본 길의 길이는 측정하지 않습니다.
 *
 * [제약 조건]
 * - dirs는 string형으로 주어지며, 'U', 'D', 'R', 'L' 이외의 문자는 주어지지 않습니다.
 * - dirs의 길이는 500 이하의 자연수입니다.
 *
 * [시간 복잡도 분석]
 * N은 스테이지의 개수이고, M은 stages의 길이입니다.
 * - 일반 시간 복잡도: O(N + M)
 * - 스테이지별 실패율 계산 시간 복잡도: O(N)
 * - 실패율을 기준으로 스테이지 정렬 시간 복잡도: O(NlogN)
 * - 모두 고려한 최종 시간 복잡도: O(M + NlogN)
 *
 * 입력값의 예:
 * - "ULURRDLLU"
 * - "LULLLLLLU"
 *
 * 이 함수는 캐릭터가 처음 걸어본 길의 길이를 반환합니다.
 */

function solution(dirs) {
  // 방문한 경로를 저장할 Set (문자열 형태로 경로 저장)
  const visited = new Set();

  // 현재 위치
  let x = 0;
  let y = 0;

  // 방향에 따른 이동 좌표
  const move = {
    U: [0, 1],
    D: [0, -1],
    R: [1, 0],
    L: [-1, 0],
  };

  let count = 0;

  for (const dir of dirs) {
    // 다음 위치 계산
    const nx = x + move[dir][0];
    const ny = y + move[dir][1];

    // 좌표평면 경계 확인 (-5 ~ 5)
    if (nx < -5 || nx > 5 || ny < -5 || ny > 5) {
      continue; // 경계를 벗어나면 무시
    }

    // 경로를 문자열로 표현 (양방향)
    // 현재 위치에서 다음 위치로 가는 경로
    const path1 = `${x},${y}->${nx},${ny}`;
    // 다음 위치에서 현재 위치로 가는 경로 (같은 길로 취급)
    const path2 = `${nx},${ny}->${x},${y}`;

    // 처음 방문하는 경로인 경우만 카운트
    if (!visited.has(path1) && !visited.has(path2)) {
      visited.add(path1);
      visited.add(path2);
      count++;
    }

    // 현재 위치 업데이트
    x = nx;
    y = ny;
  }

  return count;
}

// 테스트 케이스
console.log(solution("ULURRDLLU")); // 7
console.log(solution("LULLLLLLU")); // 7

// 링크: https://school.programmers.co.kr/learn/courses/30/lessons/49994
