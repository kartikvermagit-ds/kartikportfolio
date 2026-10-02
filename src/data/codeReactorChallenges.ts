// Deterministic challenge dataset for Task 8: Code Reactor
import type { CodeReactorChallenge } from '../types/codeReactor';

export const CODE_REACTOR_CHALLENGES: CodeReactorChallenge[] = [
  {
    id: 'cr-01-array',
    number: '01 / 05',
    title: 'CHALLENGE 01 — ARRAY SIGNAL',
    category: 'ARRAY / HASHING',
    concept: 'COMPLEMENT HASH MAP LOOKUP',
    difficulty: 'INTRO',
    prompt: 'Given input array [2, 7, 11, 15] and target sum 9, select the two values that satisfy: A + B = 9.',
    language: 'cpp',
    type: 'ARRAY_SIGNAL',
    arrayValues: [2, 7, 11, 15],
    targetSum: 9,
    correctAnswer: [2, 7],
    codeSnippet: [
      { lineNum: '01', code: '// Two Sum: Target complement lookup' },
      { lineNum: '02', code: 'unordered_map<int, int> seen;' },
      { lineNum: '03', code: 'for (int i = 0; i < nums.size(); ++i) {', isHighlighted: true },
      { lineNum: '04', code: '    int complement = target - nums[i];' },
      { lineNum: '05', code: '    if (seen.count(complement)) return {complement, nums[i]};' },
      { lineNum: '06', code: '    seen[nums[i]] = i;' },
      { lineNum: '07', code: '}' }
    ],
    hint1: 'Think about how you can remember values you have already scanned.',
    hint2: 'For value 2, compute 9 - 2 = 7. Look for 7 in the candidate set.',
    explanation: 'Instead of comparing every pair in O(n²) quadratic time, an associative hash map stores visited elements. For each number x, checking if (target - x) exists takes average O(1) time.',
    complexity: 'Average: O(n) Time | O(n) Space',
    projectConnection: 'Powering high-frequency telemetry signal aggregation in PYRAVEX.'
  },
  {
    id: 'cr-02-stack',
    number: '02 / 05',
    title: 'CHALLENGE 02 — STACK INTEGRITY',
    category: 'STACK / LIFO',
    concept: 'LAST-IN, FIRST-OUT (LIFO) SCOPE RESOLUTION',
    difficulty: 'CORE',
    prompt: 'Step through the bracket stream {[()]} to validate syntax integrity using PUSH and POP operations.',
    language: 'cpp',
    type: 'STACK_SIMULATE',
    bracketStream: ['{', '[', '(', ')', ']', '}'],
    correctAnswer: 'VALID',
    codeSnippet: [
      { lineNum: '01', code: 'stack<char> st;' },
      { lineNum: '02', code: 'for (char ch : s) {' },
      { lineNum: '03', code: '    if (isOpening(ch)) st.push(ch);', isHighlighted: true },
      { lineNum: '04', code: '    else if (st.empty() || !isMatch(st.top(), ch)) return false;' },
      { lineNum: '05', code: '    else st.pop();' },
      { lineNum: '06', code: '}' },
      { lineNum: '07', code: 'return st.empty();' }
    ],
    hint1: 'Opening brackets must be preserved in memory until a closing counterpart arrives.',
    hint2: 'LIFO rule: The innermost bracket must be popped and verified before outer brackets can resolve.',
    explanation: 'A stack guarantees that nested syntax scopes resolve in reverse chronological order. Any mismatch between current closing bracket and stack top signals an unclosed block.',
    complexity: 'O(n) Time | O(n) Stack Depth',
    projectConnection: 'Used in Veridexa document AST parsing to validate nested hierarchical blocks.'
  },
  {
    id: 'cr-03-debug',
    number: '03 / 05',
    title: 'CHALLENGE 03 — DEBUGGING & BOUNDARIES',
    category: 'CODE DEBUGGING',
    concept: 'OFF-BY-ONE & BUFFER OVER-READ AVOIDANCE',
    difficulty: 'CORE',
    prompt: 'Examine this array accumulation loop for an array of size n (indices 0 to n-1). Which line causes a memory boundary violation?',
    language: 'cpp',
    type: 'DEBUG_LOGIC',
    options: [
      { id: 'init', label: 'Initialization: int i = 0', subLabel: 'Loop counter starts at index 0' },
      { id: 'condition', label: 'Condition: i <= n', subLabel: 'Loop condition allows i to reach n' },
      { id: 'increment', label: 'Increment: ++i', subLabel: 'Counter advances by 1' },
      { id: 'acc', label: 'Operation: sum += arr[i]', subLabel: 'Value accumulated into sum' }
    ],
    correctAnswer: 'condition',
    codeSnippet: [
      { lineNum: '01', code: 'int sum = 0;' },
      { lineNum: '02', code: 'for (int i = 0; i <= n; ++i) {', hasError: true, isHighlighted: true },
      { lineNum: '03', code: '    sum += arr[i]; // Memory over-read at i == n' },
      { lineNum: '04', code: '}' },
      { lineNum: '05', code: 'return sum;' }
    ],
    hint1: 'In 0-indexed arrays of size n, valid indices are strictly 0, 1, ..., n-1.',
    hint2: 'Look closely at the comparison operator in the loop header on line 02.',
    explanation: 'When i reaches n, evaluating arr[n] attempts to read past the allocated array buffer, causing an off-by-one out-of-bounds bug. The condition must be strictly i < n.',
    complexity: 'Fix: Change "i <= n" to "i < n"',
    projectConnection: 'Critical in C/C++ memory security and deterministic buffer parsing.'
  },
  {
    id: 'cr-04-graph',
    number: '04 / 05',
    title: 'CHALLENGE 04 — GRAPH TRAVERSAL',
    category: 'GRAPHS & NETWORKS',
    concept: 'DIRECTED STATE TRANSITION PATHFINDING',
    difficulty: 'CORE',
    prompt: 'Trace a continuous directed route from Source node (A) to Exit node (F) through the state graph.',
    language: 'cpp',
    type: 'GRAPH_PATH',
    startNode: 'A',
    exitNode: 'F',
    graphNodes: [
      { id: 'A', label: 'A (SRC)', x: 60, y: 130 },
      { id: 'B', label: 'NODE B', x: 200, y: 70 },
      { id: 'C', label: 'NODE C', x: 200, y: 190 },
      { id: 'D', label: 'NODE D', x: 340, y: 70 },
      { id: 'E', label: 'NODE E', x: 340, y: 190 },
      { id: 'F', label: 'F (EXIT)', x: 480, y: 130 }
    ],
    graphEdges: [
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'B', to: 'D' },
      { from: 'C', to: 'D' },
      { from: 'C', to: 'E' },
      { from: 'E', to: 'F' }
    ],
    correctAnswer: ['A', 'C', 'E', 'F'],
    codeSnippet: [
      { lineNum: '01', code: '// Breadth-First Search (BFS) Traversal' },
      { lineNum: '02', code: 'queue<string> q; q.push("A");' },
      { lineNum: '03', code: 'while (!q.empty()) {' },
      { lineNum: '04', code: '    string curr = q.front(); q.pop();', isHighlighted: true },
      { lineNum: '05', code: '    if (curr == "F") return true; // Reached Exit' },
      { lineNum: '06', code: '    for (auto& nbr : adj[curr]) q.push(nbr);' },
      { lineNum: '07', code: '}' }
    ],
    hint1: 'Node D has no outgoing edges to F (it is a dead-end terminal).',
    hint2: 'From A, step to C. Then inspect where C branches to reach F.',
    explanation: 'Directed graphs represent state transitions. While node B leads to D (a dead-end), selecting path A → C → E → F successfully satisfies node adjacency to reach exit F.',
    complexity: 'O(V + E) Traversal Complexity',
    projectConnection: 'Underpins ChronoSat temporal frame routing and geospatial adjacency indexing.'
  },
  {
    id: 'cr-05-output',
    number: '05 / 05',
    title: 'CHALLENGE 05 — OUTPUT PREDICTION',
    category: 'LANGUAGE SYNTAX',
    concept: 'OPERATOR PRECEDENCE & ARITHMETIC AST EVALUATION',
    difficulty: 'APPLIED',
    prompt: 'Predict the exact console output of this C++ arithmetic print statement.',
    language: 'cpp',
    type: 'OUTPUT_PREDICTION',
    options: [
      { id: 'opt-11', label: '11', subLabel: 'Multiplication takes precedence: 5 + (2 * 3)' },
      { id: 'opt-21', label: '21', subLabel: 'Left-to-right evaluation: (5 + 2) * 3' },
      { id: 'opt-15', label: '15', subLabel: 'Arbitrary grouping' },
      { id: 'opt-7', label: '7', subLabel: 'Calculation error' }
    ],
    correctAnswer: 'opt-11',
    codeSnippet: [
      { lineNum: '01', code: 'int x = 5;' },
      { lineNum: '02', code: 'int y = 2;' },
      { lineNum: '03', code: 'cout << x + y * 3; // Evaluate expression', isHighlighted: true },
      { lineNum: '04', code: '// Operator Precedence: * before +' }
    ],
    hint1: 'Remember basic order of operations in C/C++: multiplication and division precede addition and subtraction.',
    hint2: 'Calculate (y * 3) first: 2 * 3 = 6. Then add x: 5 + 6.',
    explanation: 'In C/C++ (and most programming languages), the multiplicative operator (*) binds tighter than the additive operator (+). The expression evaluates as 5 + (2 * 3) = 11 rather than (5 + 2) * 3 = 21.',
    complexity: 'O(1) Static AST Compilation',
    projectConnection: 'Foundation of compiler AST parsing and mathematical formula evaluation.'
  }
];
