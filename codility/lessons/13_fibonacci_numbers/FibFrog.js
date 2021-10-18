/*
The Fibonacci sequence is defined using the following recursive formula:

    F(0) = 0
    F(1) = 1
    F(M) = F(M - 1) + F(M - 2) if M >= 2
A small frog wants to get to the other side of a river. The frog is initially located at one bank of the river (position −1) and wants to get to the other bank (position N). The frog can jump over any distance F(K), where F(K) is the K-th Fibonacci number. Luckily, there are many leaves on the river, and the frog can jump between the leaves, but only in the direction of the bank at position N.

The leaves on the river are represented in an array A consisting of N integers. Consecutive elements of array A represent consecutive positions from 0 to N − 1 on the river. Array A contains only 0s and/or 1s:

0 represents a position without a leaf;
1 represents a position containing a leaf.
The goal is to count the minimum number of jumps in which the frog can get to the other side of the river (from position −1 to position N). The frog can jump between positions −1 and N (the banks of the river) and every position containing a leaf.

For example, consider array A such that:

    A[0] = 0
    A[1] = 0
    A[2] = 0
    A[3] = 1
    A[4] = 1
    A[5] = 0
    A[6] = 1
    A[7] = 0
    A[8] = 0
    A[9] = 0
    A[10] = 0
The frog can make three jumps of length F(5) = 5, F(3) = 2 and F(5) = 5.

Write a function:

function solution(A);

that, given an array A consisting of N integers, returns the minimum number of jumps by which the frog can get to the other side of the river. If the frog cannot reach the other side of the river, the function should return −1.

For example, given:

    A[0] = 0
    A[1] = 0
    A[2] = 0
    A[3] = 1
    A[4] = 1
    A[5] = 0
    A[6] = 1
    A[7] = 0
    A[8] = 0
    A[9] = 0
    A[10] = 0
the function should return 3, as explained above.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [0..100,000];
each element of array A is an integer that can have one of the following values: 0, 1.
*/

/* Test Case */
// solution([0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0]); //3
// solution([1, 0, 0, 1, 0]); // 2
// solution([0, 0, 1, 0]); // 1
// solution([0, 0, 0, 1, 0, 0]); //-1
// solution([0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1]); //3
// solution([1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]); //2

function solution(A) {
    let N = A.length;
    let fibos = [0, 1];
    for (let i = 0; fibos[fibos.length - 1] <= N + 1; i++) {    // jump 가능한 fibonacci 값 저장 (N 보다 큰 값을 jump하는 경우 없음)
        fibo(i);
    }
    fibos = fibos.slice(2);
    fibos.sort((a, b) => b - a);    // 값이 큰 fibonacci 값 부터 jump 가능한지 탐색할것이므로 내림차순 정렬

    // console.log(`------------ start ------------ N: ${N}, fibos: ${fibos}`);

    // N까지 도착까지의 최소 jump 횟수를 구할 작업들을 저장
    let queue = [{
        idx: -1,
        cnt: 0
    }];
    let minCnt = -1;
    let visitedArr = Array.from({length: N}, () => false);  // index별 방문 여부를 저장 (한번 방문한 leaf index는 이미 N까지의 최소 jump cnt를 구했음)
    while (queue.length !== 0) {
        let cur = queue.shift();
        // console.log(`queue.shift() - idx: ${cur.idx}, cnt: ${cur.cnt}`);
        /*
           A(leafArr)로 loop 돌리면 Time Complexity가 Nx(N-1) = N제곱
            fibos로 loop 돌리면 Nxlog(N)
        */
        fibos.forEach(v => {
            let nextIdx = cur.idx + v;
            if (nextIdx === N) {
                cur.cnt++;
                minCnt = (minCnt === -1) ? cur.cnt : (cur.cnt < minCnt) ? cur.cnt : minCnt;
                // console.log(`[HIT] jump ${cur.idx} -> ${nextIdx} cnt: ${cur.cnt} minCnt: ${minCnt}`);
            } else if (nextIdx < N && A[nextIdx] === 1 && !visitedArr[nextIdx]) {
                queue.push({idx: nextIdx, cnt: cur.cnt + 1});
                visitedArr[nextIdx] = true;
                // console.log(`jump ${cur.idx} -> ${nextIdx} cnt: ${cur.cnt + 1}`);
            }
        });
    }

    // console.log(`answer: ${minCnt}`);
    return minCnt;

    function fibo(n) {
        if (n < fibos.length) {
            return fibos[n];
        }
        fibos.push(fibo(n - 1) + fibo(n - 2));
        return fibos[n];
    }
}
