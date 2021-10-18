/*
        A
       / \   
      B   C
     /   / \
    D   E   F
       / \
      G   H

BFS 넓이 우선 탐색
    A -> B -> C -> D -> E -> F -> G -> H
DFS 깊이 우선 탐색
    A -> B -> D -> C -> E -> G -> H -> F
*/

class Node {
    constructor(data) {
        this.data = data;
        this.children = [];
    }

    add(data) {
        this.children.push(new Node(data));
    }

    remove(data) {
        this.children = this.children.filter(v => v!== data);
    }
}

class BreadthFirstSearchTree {  // 큐를 이용해서 구현
    constructor(root) {
        this.root = root;
    }

    // FIFO
    // queue의 first element를 먼저 방문하고 child node들은 queue의 뒤로 넣는다
    visit(fn) {
        const unvisitedQueue = [this.root];
        while(unvisitedQueue.length !== 0) {
            const current = unvisitedQueue.shift();
            unvisitedQueue.push(...current.children);
            fn(current);
        }
    }
}

class DepthFirstSearchTree {    // 스택 또는 재귀함수로 구현
    constructor(root) {
        this.root = root;
    }
    // LIFO
    // stack과 같은 효과를 위해 queue의 first element를 먼저 방문하고 child node들을 queue의 앞으로 넣는다.
    visit(fn) {
        const unvisitedQueue = [this.root];
        while(unvisitedQueue.length !== 0) {
            const current = unvisitedQueue.shift();
            unvisitedQueue.unshift(...current.children);
            fn(current);
        }
    }
}

test();

function test() {
    let rootNode = generateTree();
    let bfsTree = new BreadthFirstSearchTree(rootNode);

    let bfsVisited = [];
    bfsTree.visit(node => bfsVisited.push(node.data));
    console.log(`BFS: ${bfsVisited}`);

    let dfsTree = new DepthFirstSearchTree(rootNode);
    let dfsVisited = [];
    dfsTree.visit(node => dfsVisited.push(node.data));
    console.log(`DFS: ${dfsVisited}`);
}

function generateTree() {
    let root = new Node('A');
        
    let nodeB = new Node('B');
    nodeB.add('D');

    let nodeC = new Node('C');
    nodeC.add('E');
    nodeC.add('F');
    // add G, H to E
    nodeC.children[0].add('G');
    nodeC.children[0].add('H');

    root.children.push(nodeB, nodeC);

    return root;
}