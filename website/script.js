/* =========================================================
   OS TUTOR LLM
   COMPLETE SCRIPT.JS
   ========================================================= */


/* =========================================================
   1. KNOWLEDGE BASE
   ========================================================= */

const knowledgeBase = {

    scheduling: {
        title: "CPU Scheduling",
        keywords: [
            "cpu scheduling",
            "scheduling",
            "scheduling algorithm",
            "cpu scheduler"
        ],

        answer: `
            <h3>CPU Scheduling</h3>

            <p>
                CPU scheduling is the process of selecting a process
                from the ready queue and allocating the CPU to it.
            </p>

            <h3>Objectives</h3>

            <ul>
                <li>Maximize CPU utilization</li>
                <li>Maximize throughput</li>
                <li>Minimize waiting time</li>
                <li>Minimize turnaround time</li>
                <li>Minimize response time</li>
            </ul>

            <h3>Common Scheduling Algorithms</h3>

            <ul>
                <li>FCFS – First Come First Serve</li>
                <li>SJF – Shortest Job First</li>
                <li>SRTF – Shortest Remaining Time First</li>
                <li>Priority Scheduling</li>
                <li>Round Robin</li>
            </ul>
        `
    },


    fcfs: {
        title: "First Come First Serve",
        keywords: [
            "fcfs",
            "first come first serve"
        ],

        answer: `
            <h3>First Come First Serve (FCFS)</h3>

            <p>
                FCFS is a non-preemptive CPU scheduling algorithm
                in which the process that arrives first gets the CPU first.
            </p>

            <h3>Working</h3>

            <ol>
                <li>Check the arrival time of processes.</li>
                <li>Select the process that arrives first.</li>
                <li>Execute it until completion.</li>
                <li>Move to the next process.</li>
            </ol>

            <h3>Advantages</h3>

            <ul>
                <li>Simple to implement.</li>
                <li>Easy to understand.</li>
                <li>Fair according to arrival order.</li>
            </ul>

            <h3>Disadvantage</h3>

            <p>
                It may suffer from the convoy effect and can produce
                high average waiting time.
            </p>
        `
    },


    sjf: {
        title: "Shortest Job First",
        keywords: [
            "sjf",
            "shortest job first"
        ],

        answer: `
            <h3>Shortest Job First (SJF)</h3>

            <p>
                SJF selects the process having the smallest CPU burst time.
            </p>

            <h3>Types</h3>

            <ul>
                <li>Non-preemptive SJF</li>
                <li>Preemptive SJF, also called SRTF</li>
            </ul>

            <h3>Advantages</h3>

            <ul>
                <li>Provides minimum average waiting time under ideal conditions.</li>
                <li>Useful for batch systems.</li>
            </ul>

            <h3>Disadvantages</h3>

            <ul>
                <li>Starvation may occur.</li>
                <li>Exact burst time may be difficult to predict.</li>
            </ul>
        `
    },


    srtf: {
        title: "Shortest Remaining Time First",
        keywords: [
            "srtf",
            "shortest remaining time first",
            "preemptive sjf"
        ],

        answer: `
            <h3>Shortest Remaining Time First (SRTF)</h3>

            <p>
                SRTF is the preemptive version of Shortest Job First.
                The process having the smallest remaining CPU burst time
                is selected.
            </p>

            <h3>Working</h3>

            <ol>
                <li>Check the processes currently available.</li>
                <li>Calculate their remaining burst times.</li>
                <li>Select the process with the smallest remaining time.</li>
                <li>If a new process arrives with a smaller remaining time,
                    preempt the current process.</li>
            </ol>

            <h3>Important Formulas</h3>

            <p>
                Turnaround Time = Completion Time − Arrival Time
            </p>

            <p>
                Waiting Time = Turnaround Time − Burst Time
            </p>
        `
    },


    roundrobin: {
        title: "Round Robin Scheduling",
        keywords: [
            "round robin",
            "round robin scheduling",
            "rr scheduling"
        ],

        answer: `
            <h3>Round Robin Scheduling</h3>

            <p>
                Round Robin is a preemptive CPU scheduling algorithm
                designed mainly for time-sharing systems.
            </p>

            <h3>Working</h3>

            <ol>
                <li>Each process gets a fixed time quantum.</li>
                <li>If the process finishes within the quantum, it leaves the queue.</li>
                <li>If it does not finish, it is moved to the end of the ready queue.</li>
                <li>The next process gets the CPU.</li>
            </ol>

            <h3>Advantages</h3>

            <ul>
                <li>Fair CPU allocation.</li>
                <li>Good response time.</li>
                <li>Suitable for time-sharing systems.</li>
            </ul>
        `
    },


    priority: {
        title: "Priority Scheduling",
        keywords: [
            "priority scheduling",
            "priority"
        ],

        answer: `
            <h3>Priority Scheduling</h3>

            <p>
                In priority scheduling, every process is assigned
                a priority value. The CPU is allocated to the process
                with the highest priority.
            </p>

            <p>
                In many textbook problems, a smaller priority number
                represents a higher priority.
            </p>

            <h3>Types</h3>

            <ul>
                <li>Preemptive Priority Scheduling</li>
                <li>Non-preemptive Priority Scheduling</li>
            </ul>

            <h3>Problem</h3>

            <p>
                Low-priority processes may suffer from starvation.
            </p>

            <h3>Solution</h3>

            <p>
                Aging can gradually increase the priority of
                waiting processes.
            </p>
        `
    },


    process: {
        title: "Process",
        keywords: [
            "what is a process",
            "process",
            "process in operating system"
        ],

        answer: `
            <h3>Process</h3>

            <p>
                A process is a program that is currently in execution.
            </p>

            <h3>Process States</h3>

            <ul>
                <li>New</li>
                <li>Ready</li>
                <li>Running</li>
                <li>Waiting / Blocked</li>
                <li>Terminated</li>
            </ul>

            <h3>Process State Flow</h3>

            <p>
                New → Ready → Running → Waiting → Ready → Terminated
            </p>
        `
    },


    pcb: {
        title: "Process Control Block",
        keywords: [
            "pcb",
            "process control block"
        ],

        answer: `
            <h3>Process Control Block (PCB)</h3>

            <p>
                PCB is a data structure maintained by the operating system
                for storing information about a process.
            </p>

            <h3>Contents of PCB</h3>

            <ul>
                <li>Process ID</li>
                <li>Process state</li>
                <li>Program counter</li>
                <li>CPU registers</li>
                <li>CPU scheduling information</li>
                <li>Memory management information</li>
                <li>I/O status information</li>
                <li>Accounting information</li>
            </ul>
        `
    },


    deadlock: {
        title: "Deadlock",
        keywords: [
            "deadlock",
            "deadlock in operating system"
        ],

        answer: `
            <h3>Deadlock</h3>

            <p>
                Deadlock is a situation in which a group of processes
                are permanently blocked because each process is waiting
                for a resource held by another process.
            </p>

            <h3>Four Necessary Conditions</h3>

            <ol>
                <li><strong>Mutual Exclusion</strong></li>
                <li><strong>Hold and Wait</strong></li>
                <li><strong>No Preemption</strong></li>
                <li><strong>Circular Wait</strong></li>
            </ol>

            <h3>Deadlock Handling</h3>

            <ul>
                <li>Deadlock Prevention</li>
                <li>Deadlock Avoidance</li>
                <li>Deadlock Detection</li>
                <li>Deadlock Recovery</li>
            </ul>

            <h3>Important</h3>

            <p>
                Banker's Algorithm is a deadlock avoidance algorithm
                used to determine whether the system is in a safe state.
            </p>
        `
    },


    bankers: {
        title: "Banker's Algorithm",
        keywords: [
            "banker's algorithm",
            "bankers algorithm",
            "banker algorithm",
            "safe sequence",
            "safe state"
        ],

        answer: `
            <h3>Banker's Algorithm</h3>

            <p>
                Banker's Algorithm is a deadlock avoidance algorithm
                that checks whether resource allocation keeps the system
                in a safe state.
            </p>

            <h3>Important Formula</h3>

            <p>
                <strong>Need = Maximum − Allocation</strong>
            </p>

            <h3>Basic Steps</h3>

            <ol>
                <li>Calculate Need for every process.</li>
                <li>Set Work = Available.</li>
                <li>Find a process whose Need ≤ Work.</li>
                <li>Assume that process completes.</li>
                <li>Release its allocated resources.</li>
                <li>Repeat until all processes finish.</li>
            </ol>

            <p>
                If all processes can finish, the system is in a
                <strong>safe state</strong>.
            </p>
        `
    },


    memory: {
        title: "Memory Management",
        keywords: [
            "memory management",
            "memory management in operating system"
        ],

        answer: `
            <h3>Memory Management</h3>

            <p>
                Memory management is the function of an operating system
                that manages the main memory and allocates memory to processes.
            </p>

            <h3>Functions</h3>

            <ul>
                <li>Memory allocation</li>
                <li>Memory deallocation</li>
                <li>Memory protection</li>
                <li>Address translation</li>
                <li>Sharing of memory</li>
            </ul>

            <h3>Techniques</h3>

            <ul>
                <li>Paging</li>
                <li>Segmentation</li>
                <li>Virtual Memory</li>
            </ul>
        `
    },


    paging: {
        title: "Paging",
        keywords: [
            "paging",
            "paging in operating system"
        ],

        answer: `
            <h3>Paging</h3>

            <p>
                Paging is a memory management technique in which
                logical memory is divided into fixed-size pages and
                physical memory is divided into fixed-size frames.
            </p>

            <h3>Address Structure</h3>

            <p>
                Logical Address = Page Number + Offset
            </p>

            <h3>Advantages</h3>

            <ul>
                <li>Eliminates external fragmentation.</li>
                <li>Allows non-contiguous memory allocation.</li>
                <li>Supports virtual memory.</li>
            </ul>
        `
    },


    virtualmemory: {
        title: "Virtual Memory",
        keywords: [
            "virtual memory",
            "virtual memory in operating system"
        ],

        answer: `
            <h3>Virtual Memory</h3>

            <p>
                Virtual memory is a memory management technique that
                allows a process to execute even when the complete
                process is not present in physical memory.
            </p>

            <h3>Advantages</h3>

            <ul>
                <li>Programs larger than physical memory can execute.</li>
                <li>Better memory utilization.</li>
                <li>Supports multiprogramming.</li>
            </ul>

            <h3>Common Techniques</h3>

            <ul>
                <li>Demand Paging</li>
                <li>Demand Segmentation</li>
            </ul>
        `
    },


    pagefault: {
        title: "Page Fault",
        keywords: [
            "page fault",
            "page faults"
        ],

        answer: `
            <h3>Page Fault</h3>

            <p>
                A page fault occurs when a process references a page
                that is not currently present in physical memory.
            </p>

            <h3>Handling</h3>

            <ol>
                <li>CPU references a page.</li>
                <li>Page is not found in memory.</li>
                <li>Hardware generates a page-fault trap.</li>
                <li>Operating system locates the page on disk.</li>
                <li>A free frame is found.</li>
                <li>Page is loaded into memory.</li>
                <li>Page table is updated.</li>
                <li>Instruction is restarted.</li>
            </ol>
        `
    },


    thread: {
        title: "Thread",
        keywords: [
            "what is a thread",
            "thread",
            "threads"
        ],

        answer: `
            <h3>Thread</h3>

            <p>
                A thread is the smallest unit of CPU execution
                within a process.
            </p>

            <h3>Thread Components</h3>

            <ul>
                <li>Program counter</li>
                <li>Registers</li>
                <li>Stack</li>
            </ul>

            <p>
                Threads belonging to the same process share
                code, data and other process resources.
            </p>
        `
    },


    multithreading: {
        title: "Multithreading",
        keywords: [
            "multithreading",
            "multi threading"
        ],

        answer: `
            <h3>Multithreading</h3>

            <p>
                Multithreading is the ability of a process to contain
                multiple threads that execute concurrently.
            </p>

            <h3>Advantages</h3>

            <ul>
                <li>Responsiveness</li>
                <li>Resource sharing</li>
                <li>Economy</li>
                <li>Better CPU utilization</li>
            </ul>
        `
    },


    semaphore: {
        title: "Semaphore",
        keywords: [
            "semaphore",
            "semaphores"
        ],

        answer: `
            <h3>Semaphore</h3>

            <p>
                A semaphore is a synchronization tool used to control
                access to shared resources.
            </p>

            <h3>Types</h3>

            <ul>
                <li>Binary Semaphore</li>
                <li>Counting Semaphore</li>
            </ul>

            <h3>Operations</h3>

            <ul>
                <li>wait()</li>
                <li>signal()</li>
            </ul>

            <p>
                Semaphores help prevent race conditions and
                coordinate processes or threads.
            </p>
        `
    },


    mutex: {
        title: "Mutex",
        keywords: [
            "mutex",
            "mutex lock"
        ],

        answer: `
            <h3>Mutex</h3>

            <p>
                A mutex is a mutual exclusion lock used to ensure that
                only one thread can access a critical section at a time.
            </p>

            <h3>Basic Operations</h3>

            <ul>
                <li>Lock</li>
                <li>Unlock</li>
            </ul>
        `
    },


    critical: {
        title: "Critical Section",
        keywords: [
            "critical section",
            "critical section problem"
        ],

        answer: `
            <h3>Critical Section</h3>

            <p>
                A critical section is the part of a program where
                shared resources are accessed or modified.
            </p>

            <h3>Requirements</h3>

            <ol>
                <li>Mutual Exclusion</li>
                <li>Progress</li>
                <li>Bounded Waiting</li>
            </ol>
        `
    },


    race: {
        title: "Race Condition",
        keywords: [
            "race condition",
            "race conditions"
        ],

        answer: `
            <h3>Race Condition</h3>

            <p>
                A race condition occurs when multiple processes or
                threads access shared data concurrently and the final
                result depends on the order of execution.
            </p>

            <h3>Prevention</h3>

            <ul>
                <li>Mutex</li>
                <li>Semaphore</li>
                <li>Monitors</li>
                <li>Locks</li>
            </ul>
        `
    },


    filesystem: {
        title: "File System",
        keywords: [
            "file system",
            "filesystem",
            "file systems"
        ],

        answer: `
            <h3>File System</h3>

            <p>
                A file system is the mechanism used by an operating system
                to organize, store and manage files on storage devices.
            </p>

            <h3>Functions</h3>

            <ul>
                <li>File creation</li>
                <li>File deletion</li>
                <li>File reading</li>
                <li>File writing</li>
                <li>Directory management</li>
                <li>Access control</li>
            </ul>
        `
    },


    directory: {
        title: "Directory Structure",
        keywords: [
            "directory structure",
            "directory",
            "directories"
        ],

        answer: `
            <h3>Directory Structure</h3>

            <p>
                A directory organizes files and other directories
                in a file system.
            </p>

            <h3>Types</h3>

            <ul>
                <li>Single-level directory</li>
                <li>Two-level directory</li>
                <li>Tree-structured directory</li>
                <li>Acyclic graph directory</li>
                <li>General graph directory</li>
            </ul>
        `
    }
};


/* =========================================================
   2. FALLBACK ANSWER
   ========================================================= */

const fallbackAnswer = `
    <h3>Topic Not Found</h3>

    <p>
        I could not find an exact topic match in the current
        OS knowledge base.
    </p>

    <p>You can ask about:</p>

    <ul>
        <li>CPU Scheduling</li>
        <li>FCFS</li>
        <li>SJF</li>
        <li>SRTF</li>
        <li>Round Robin</li>
        <li>Priority Scheduling</li>
        <li>Processes</li>
        <li>PCB</li>
        <li>Deadlock</li>
        <li>Banker's Algorithm</li>
        <li>Memory Management</li>
        <li>Paging</li>
        <li>Virtual Memory</li>
        <li>Page Fault</li>
        <li>Threads</li>
        <li>Multithreading</li>
        <li>Semaphore</li>
        <li>Mutex</li>
        <li>Critical Section</li>
        <li>Race Condition</li>
        <li>File System</li>
        <li>Directory Structure</li>
    </ul>

    <p>
        You can also ask for a numerical problem, for example:
    </p>

    <p>
        <strong>
        "Give me an example problem on deadlock"
        </strong>
    </p>
`;


/* =========================================================
   3. NUMERICAL PROBLEM BANK
   ========================================================= */

const numericalProblems = {

    deadlock: [

        {
            question:
                "Consider 3 processes P1, P2 and P3 and 3 resource types A, B and C. The Available resources are (1, 1, 1). Determine whether the system is in a safe state using Banker's Algorithm.",

            answer:
                "The system is in a safe state.",

            solution: `
                <h3>Given</h3>

                <p>
                    Available = <strong>(1, 1, 1)</strong>
                </p>

                <table class="numerical-table">

                    <tr>
                        <th>Process</th>
                        <th>Allocation</th>
                        <th>Need</th>
                    </tr>

                    <tr>
                        <td>P1</td>
                        <td>(1, 0, 1)</td>
                        <td>(1, 1, 0)</td>
                    </tr>

                    <tr>
                        <td>P2</td>
                        <td>(1, 1, 0)</td>
                        <td>(0, 1, 1)</td>
                    </tr>

                    <tr>
                        <td>P3</td>
                        <td>(0, 0, 1)</td>
                        <td>(1, 0, 0)</td>
                    </tr>

                </table>

                <h3>Step 1: Check P1</h3>

                <p>
                    Need(P1) = (1, 1, 0)
                </p>

                <p>
                    Available = (1, 1, 1)
                </p>

                <p>
                    Need(P1) ≤ Available.
                </p>

                <p>
                    Therefore P1 can complete.
                </p>

                <p>
                    New Available:
                </p>

                <p>
                    (1,1,1) + (1,0,1)
                    = <strong>(2,1,2)</strong>
                </p>

                <h3>Step 2: Check P2</h3>

                <p>
                    Need(P2) = (0,1,1)
                </p>

                <p>
                    Available = (2,1,2)
                </p>

                <p>
                    Therefore P2 can complete.
                </p>

                <p>
                    New Available:
                </p>

                <p>
                    (2,1,2) + (1,1,0)
                    = <strong>(3,2,2)</strong>
                </p>

                <h3>Step 3: Check P3</h3>

                <p>
                    Need(P3) = (1,0,0)
                </p>

                <p>
                    Available = (3,2,2)
                </p>

                <p>
                    Therefore P3 can complete.
                </p>

                <p>
                    New Available:
                    <strong>(3,2,3)</strong>
                </p>

                <h3>Step 4: Safe Sequence</h3>

                <p>
                    Safe Sequence =
                    <strong>⟨P1 → P2 → P3⟩</strong>
                </p>

                <h3>Final Answer</h3>

                <p class="final-answer">
                    ✅ The system is in a <strong>SAFE STATE</strong>.
                </p>
            `
        },

        {
            question:
                "A system has 3 processes P1, P2 and P3 and 3 resource types A, B and C. Available resources are (3, 3, 2). Determine a safe sequence.",

            answer:
                "A possible safe sequence is P1 → P2 → P3.",

            solution: `
                <h3>Given</h3>

                <p>
                    Available = <strong>(3, 3, 2)</strong>
                </p>

                <table class="numerical-table">

                    <tr>
                        <th>Process</th>
                        <th>Allocation</th>
                        <th>Need</th>
                    </tr>

                    <tr>
                        <td>P1</td>
                        <td>(1, 0, 0)</td>
                        <td>(2, 1, 1)</td>
                    </tr>

                    <tr>
                        <td>P2</td>
                        <td>(1, 1, 1)</td>
                        <td>(1, 1, 1)</td>
                    </tr>

                    <tr>
                        <td>P3</td>
                        <td>(1, 1, 0)</td>
                        <td>(1, 1, 1)</td>
                    </tr>

                </table>

                <h3>Step 1</h3>

                <p>
                    Need(P1) = (2,1,1)
                </p>

                <p>
                    Available = (3,3,2)
                </p>

                <p>
                    Therefore P1 can complete.
                </p>

                <p>
                    New Available =
                    (3,3,2) + (1,0,0)
                    = <strong>(4,3,2)</strong>
                </p>

                <h3>Step 2</h3>

                <p>
                    Need(P2) = (1,1,1)
                </p>

                <p>
                    P2 can complete.
                </p>

                <p>
                    New Available =
                    (4,3,2) + (1,1,1)
                    = <strong>(5,4,3)</strong>
                </p>

                <h3>Step 3</h3>

                <p>
                    Need(P3) = (1,1,1)
                </p>

                <p>
                    P3 can complete.
                </p>

                <h3>Final Answer</h3>

                <p class="final-answer">
                    Safe Sequence =
                    <strong>⟨P1 → P2 → P3⟩</strong>
                </p>

                <p class="final-answer">
                    ✅ System is SAFE.
                </p>
            `
        }

    ],


    paging: [

        {
            question:
                "A system has a page size of 1 KB. If the logical address is 2050 bytes, find the page number and offset.",

            answer:
                "Page Number = 2 and Offset = 2 bytes.",

            solution: `
                <h3>Given</h3>

                <p>
                    Page Size = <strong>1 KB = 1024 bytes</strong>
                </p>

                <p>
                    Logical Address = <strong>2050 bytes</strong>
                </p>

                <h3>Step 1: Page Number</h3>

                <p>
                    Page Number =
                    Logical Address ÷ Page Size
                </p>

                <p>
                    = 2050 ÷ 1024
                </p>

                <p>
                    = <strong>2</strong>
                </p>

                <h3>Step 2: Offset</h3>

                <p>
                    Offset =
                    Logical Address mod Page Size
                </p>

                <p>
                    = 2050 mod 1024
                </p>

                <p>
                    = <strong>2 bytes</strong>
                </p>

                <h3>Final Answer</h3>

                <p class="final-answer">
                    Page Number = <strong>2</strong>
                </p>

                <p class="final-answer">
                    Offset = <strong>2 bytes</strong>
                </p>
            `
        },

        {
            question:
                "A system uses a page size of 512 bytes. Find the page number and offset for logical address 1234.",

            answer:
                "Page Number = 2 and Offset = 210 bytes.",

            solution: `
                <h3>Given</h3>

                <p>
                    Page Size = <strong>512 bytes</strong>
                </p>

                <p>
                    Logical Address = <strong>1234</strong>
                </p>

                <h3>Step 1: Page Number</h3>

                <p>
                    Page Number =
                    1234 ÷ 512
                </p>

                <p>
                    Integer quotient = <strong>2</strong>
                </p>

                <h3>Step 2: Offset</h3>

                <p>
                    Offset =
                    1234 mod 512
                </p>

                <p>
                    = <strong>210 bytes</strong>
                </p>

                <h3>Final Answer</h3>

                <p class="final-answer">
                    Page Number = <strong>2</strong>
                </p>

                <p class="final-answer">
                    Offset = <strong>210 bytes</strong>
                </p>
            `
        }

    ],


    scheduling: [

        {
            question:
                "Consider three processes P1, P2 and P3 with burst times 5 ms, 3 ms and 8 ms respectively. All processes arrive at time 0. Calculate the average waiting time using FCFS scheduling.",

            answer:
                "Average Waiting Time = 4.33 ms.",

            solution: `
                <h3>Given</h3>

                <table class="numerical-table">

                    <tr>
                        <th>Process</th>
                        <th>Arrival Time</th>
                        <th>Burst Time</th>
                    </tr>

                    <tr>
                        <td>P1</td>
                        <td>0</td>
                        <td>5</td>
                    </tr>

                    <tr>
                        <td>P2</td>
                        <td>0</td>
                        <td>3</td>
                    </tr>

                    <tr>
                        <td>P3</td>
                        <td>0</td>
                        <td>8</td>
                    </tr>

                </table>

                <h3>Step 1: FCFS Order</h3>

                <p>
                    All processes arrive at time 0.
                </p>

                <p>
                    Therefore:
                    <strong>P1 → P2 → P3</strong>
                </p>

                <h3>Step 2: Waiting Time</h3>

                <p>
                    WT(P1) = 0
                </p>

                <p>
                    WT(P2) = 5
                </p>

                <p>
                    WT(P3) = 5 + 3 = 8
                </p>

                <h3>Step 3: Average Waiting Time</h3>

                <p>
                    Average WT =
                    (0 + 5 + 8) / 3
                </p>

                <p>
                    = 13 / 3
                </p>

                <p>
                    = <strong>4.33 ms</strong>
                </p>

                <h3>Final Answer</h3>

                <p class="final-answer">
                    Average Waiting Time =
                    <strong>4.33 ms</strong>
                </p>
            `
        }

    ]

};


/* =========================================================
   4. LEARNING MODE
   ========================================================= */

function getLearningMode() {

    return localStorage.getItem("osTutorLearningMethod") || "detailed";

}


function getModeLabel() {

    const mode = getLearningMode();

    if (mode === "short") {
        return "Short";
    }

    if (mode === "exam") {
        return "Exam Mode";
    }

    return "Detailed";
}


/* =========================================================
   5. APPLY LEARNING MODE TO ANSWER
   ========================================================= */

function applyLearningMode(answer) {

    const mode = getLearningMode();

    if (mode === "short") {

        const temp = document.createElement("div");
        temp.innerHTML = answer;

        const paragraphs = temp.querySelectorAll("p");
        const lists = temp.querySelectorAll("ul, ol");
        const tables = temp.querySelectorAll("table");
        const headings = temp.querySelectorAll("h3");

        paragraphs.forEach((p, index) => {

            if (index > 1) {
                p.remove();
            }

        });

        lists.forEach(list => {

            if (list.previousElementSibling &&
                list.previousElementSibling.tagName === "H3") {
                return;
            }

            list.remove();

        });

        tables.forEach(table => {

            table.remove();

        });

        headings.forEach((heading, index) => {

            if (index > 1) {
                heading.remove();
            }

        });

        return temp.innerHTML;
    }


    if (mode === "exam") {

        return `
            <div class="exam-answer">

                ${answer}

                <div class="exam-tip-box">

                    <strong>📝 Exam Tip</strong>

                    <p>
                        For a 10-mark answer, write the definition,
                        working/steps, important points, advantages
                        or disadvantages, and a suitable example.
                    </p>

                </div>

            </div>
        `;
    }


    return answer;
}


/* =========================================================
   6. GET NUMERICAL PROBLEM
   ========================================================= */

function getNumericalProblem(question) {

    const q = question.toLowerCase();

    const asksForProblem =
        q.includes("example problem") ||
        q.includes("example problems") ||
        q.includes("numerical") ||
        q.includes("numerical problem") ||
        q.includes("practice problem") ||
        q.includes("practice problems") ||
        q.includes("give me a problem") ||
        q.includes("give me some problems") ||
        q.includes("solve a problem");


    if (!asksForProblem) {
        return null;
    }


    if (
        q.includes("deadlock") ||
        q.includes("banker") ||
        q.includes("safe sequence") ||
        q.includes("safe state")
    ) {

        const list = numericalProblems.deadlock;

        return list[
            Math.floor(Math.random() * list.length)
        ];
    }


    if (
        q.includes("paging") ||
        q.includes("page number") ||
        q.includes("page size")
    ) {

        const list = numericalProblems.paging;

        return list[
            Math.floor(Math.random() * list.length)
        ];
    }


    if (
        q.includes("scheduling") ||
        q.includes("fcfs") ||
        q.includes("waiting time") ||
        q.includes("turnaround time")
    ) {

        const list = numericalProblems.scheduling;

        return list[
            Math.floor(Math.random() * list.length)
        ];
    }


    return null;
}


/* =========================================================
   7. GET ANSWER
   ========================================================= */

function getAnswer(question) {

    const numericalProblem = getNumericalProblem(question);


    if (numericalProblem) {

        let numericalAnswer = `

            <div class="numerical-problem">

                <div class="numerical-heading">
                    🧮 Numerical Problem
                </div>

                <h3>Question</h3>

                <div class="problem-question">
                    ${numericalProblem.question}
                </div>

                <h3>Answer</h3>

                <div class="problem-answer">
                    ${numericalProblem.answer}
                </div>

                ${numericalProblem.solution}

            </div>

        `;

        return {
            title: "Numerical Problem",
            answer: applyLearningMode(numericalAnswer)
        };
    }


    const normalizedQuestion =
        question.toLowerCase().trim();


    let bestMatch = null;
    let bestScore = 0;


    for (const key in knowledgeBase) {

        const topic = knowledgeBase[key];

        let score = 0;


        topic.keywords.forEach(keyword => {

            if (normalizedQuestion.includes(keyword)) {

                score += keyword.length;

            }

        });


        if (score > bestScore) {

            bestScore = score;
            bestMatch = topic;

        }

    }


    if (bestMatch) {

        return {

            title: bestMatch.title,

            answer:
                applyLearningMode(bestMatch.answer)

        };

    }


    return {

        title: "OS TutorLLM",

        answer: fallbackAnswer

    };

}


/* =========================================================
   8. ADD TUTOR MESSAGE
   ========================================================= */

function addTutorMessage(title, answer) {
    const chatContent = document.getElementById("chatContent");
    if (!chatContent) return;

    const message = document.createElement("div");
    message.className = "message tutor";

    message.innerHTML = `
        <div class="avatar">🤖</div>
        <div class="message-body">
            <div class="message-name">${escapeHTML(title || "OS TutorLLM")}</div>
            <div class="message-card">${answer}</div>
        </div>
    `;

    chatContent.appendChild(message);
    chatContent.scrollTop = chatContent.scrollHeight;
}


/* =========================================================
   9. ADD USER MESSAGE
   ========================================================= */

function addUserMessage(question) {

    const chatContent =
        document.getElementById("chatContent");


    if (!chatContent) {
        return;
    }


    const message =
        document.createElement("div");


    message.className = "message user";


    message.innerHTML = `

        <div class="avatar">
            👨‍🎓
        </div>

        <div class="message-body">

            <div class="message-name">
                You
            </div>

            <div class="message-card">

                ${escapeHTML(question)}

            </div>

        </div>

    `;


    chatContent.appendChild(message);


    chatContent.scrollTop =
        chatContent.scrollHeight;
}


/* =========================================================
   10. ASK QUESTION
   ========================================================= */

async function askQuestion(question) {
    if (!question || !question.trim()) return;

    question = question.trim();
    addUserMessage(question);
    saveQuestionToHistory(question);

    const mode = getLearningMode();
    const loadingMessage = addTutorMessage(
        "OS TutorLLM",
        "<p class=\"backend-loading\">Searching your supplied PDFs...</p>"
    );

    try {
        const response = await fetch("http://127.0.0.1:8080/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                question: question,
                mode: mode
            })
        });

        const data = await response.json();

        // Remove the temporary loading message.
        const chatContent = document.getElementById("chatContent");
        if (chatContent) {
            const loading = chatContent.querySelectorAll(".backend-loading");
            if (loading.length) {
                const loadingParagraph = loading[loading.length - 1];
                const tutorMessage = loadingParagraph.closest(".message.tutor");
                if (tutorMessage) tutorMessage.remove();
            }
        }

        if (!response.ok) {
            throw new Error(data.error || "The backend request failed.");
        }

        const found = data.found === true;
        const modeLabels = {
            short: "Short Mode — concise PDF retrieval",
            detailed: "Detailed Mode — expanded PDF retrieval",
            exam: "Exam Mode — exam-focused PDF retrieval"
        };
        const modeLabel = modeLabels[mode] || modeLabels.detailed;

        // The backend returns source text, not generated prose.
        // Escape it before displaying it as HTML.
        let answerHtml = `<p><strong>${escapeHTML(modeLabel)}</strong></p>`;

        if (found && data.answer) {
            answerHtml += `<div class="pdf-answer">${escapeHTML(data.answer).replace(/\r?\n/g, "<br>")}</div>`;
        } else {
            answerHtml += `<p>${escapeHTML(data.answer || "This topic has not been found in the supplied PDFs. Please check whether the relevant topic is included in your PDFs.")}</p>`;
        }

        if (Array.isArray(data.sources) && data.sources.length > 0) {
            answerHtml += `<div class="source-badge"><strong>PDF Sources</strong><ul>`;
            data.sources.forEach(source => {
                answerHtml += `<li>${escapeHTML(String(source.filename || "Unknown PDF"))} — PDF page ${escapeHTML(String(source.page ?? "?"))}</li>`;
            });
            answerHtml += `</ul></div>`;
        } else if (found) {
            answerHtml += `<div class="source-badge">No source metadata was returned.</div>`;
        }

        addTutorMessage("OS TutorLLM", answerHtml);
    } catch (error) {
        const chatContent = document.getElementById("chatContent");
        if (chatContent) {
            const loading = chatContent.querySelectorAll(".backend-loading");
            if (loading.length) {
                const tutorMessage = loading[loading.length - 1].closest(".message.tutor");
                if (tutorMessage) tutorMessage.remove();
            }
        }

        addTutorMessage(
            "OS TutorLLM",
            `<p>Could not connect to the PDF backend. Make sure the C++ server is running at <code>http://127.0.0.1:8080</code>, then try again.</p>`
        );
        console.error("OS TutorLLM backend error:", error);
    }
}


/* =========================================================
   11. ESCAPE HTML
   ========================================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================================================
   12. QUESTION HISTORY
   ========================================================= */

function saveQuestionToHistory(question) {

    let history =
        JSON.parse(
            localStorage.getItem("osTutorHistory") || "[]"
        );


    history.unshift({

        question: question,

        time:
            new Date().toLocaleString()

    });


    history =
        history.slice(0, 50);


    localStorage.setItem(
        "osTutorHistory",
        JSON.stringify(history)
    );

}


/* =========================================================
   13. SHOW TOPICS
   ========================================================= */

function showTopics() {

    const section =
        document.querySelector(".chat-section");


    if (!section) {
        return;
    }


    section.innerHTML = `

        <div class="topics-container">

            <div class="topics-header">

                <h2>Operating Systems Topics</h2>

                <p>
                    Select a topic to start learning.
                </p>

            </div>


            <div class="topic-grid">

                <div class="topic-card"
                     onclick="openTopic('What is CPU Scheduling?')">

                    <span>⚙️</span>

                    <h3>CPU Scheduling</h3>

                    <p>
                        FCFS, SJF, SRTF, Round Robin
                        and Priority Scheduling.
                    </p>

                </div>


                <div class="topic-card"
                     onclick="openTopic('What is Deadlock?')">

                    <span>🔒</span>

                    <h3>Deadlocks</h3>

                    <p>
                        Deadlock conditions and
                        Banker's Algorithm.
                    </p>

                </div>


                <div class="topic-card"
                     onclick="openTopic('What is Memory Management?')">

                    <span>🧠</span>

                    <h3>Memory Management</h3>

                    <p>
                        Paging, virtual memory
                        and page faults.
                    </p>

                </div>


                <div class="topic-card"
                     onclick="openTopic('What is a Process?')">

                    <span>🔄</span>

                    <h3>Processes</h3>

                    <p>
                        Processes, PCB and process states.
                    </p>

                </div>


                <div class="topic-card"
                     onclick="openTopic('What is a Thread?')">

                    <span>🧵</span>

                    <h3>Threads</h3>

                    <p>
                        Threads and multithreading.
                    </p>

                </div>


                <div class="topic-card"
                     onclick="openTopic('What is a Semaphore?')">

                    <span>🔐</span>

                    <h3>Synchronization</h3>

                    <p>
                        Semaphore, mutex,
                        critical section and race condition.
                    </p>

                </div>


                <div class="topic-card"
                     onclick="openTopic('What is a File System?')">

                    <span>📁</span>

                    <h3>File Systems</h3>

                    <p>
                        File systems and directory structures.
                    </p>

                </div>

            </div>

        </div>

    `;

}


/* =========================================================
   14. OPEN TOPIC
   ========================================================= */

function openTopic(question) {

    sessionStorage.setItem(
        "osTutorPendingQuestion",
        question
    );


    showChat();

}


/* =========================================================
   15. SHOW CHAT
   ========================================================= */

function showChat() {

    location.reload();

}


/* =========================================================
   16. SETTINGS
   ========================================================= */

function showSettings() {

    const section =
        document.querySelector(".chat-section");


    if (!section) {
        return;
    }


    const selectedMode =
        getLearningMode();


    const history =
        JSON.parse(
            localStorage.getItem("osTutorHistory") || "[]"
        );


    const quizHistory =
        JSON.parse(
            localStorage.getItem("osTutorQuizHistory") || "[]"
        );


    const quizAttempts =
        quizHistory.length;


    const totalQuizQuestions =
        quizHistory.reduce(
            (sum, quiz) =>
                sum + (quiz.total || 0),
            0
        );


    const totalQuizCorrect =
        quizHistory.reduce(
            (sum, quiz) =>
                sum + (quiz.score || 0),
            0
        );


    let progress = 0;


    if (totalQuizQuestions > 0) {

        progress =
            Math.round(
                (totalQuizCorrect /
                    totalQuizQuestions) * 100
            );

    }


    section.innerHTML = `

        <div class="settings-container">

            <div class="settings-header">

                <h2>Settings</h2>

                <p>
                    Customize your OS TutorLLM learning experience.
                </p>

            </div>


            <!-- APPEARANCE -->

            <div class="settings-card">

                <div class="settings-card-header">

                    <div>

                        <h3>🎨 Appearance</h3>

                        <p>
                            Choose your preferred theme.
                        </p>

                    </div>

                </div>


                <div class="appearance-options">

                    <button
                        class="appearance-option
                        ${!document.body.classList.contains("light")
                            ? "selected"
                            : ""}"
                        onclick="setTheme('dark')">

                        <span>🌙</span>

                        <strong>Dark</strong>

                        ${
                            !document.body.classList.contains("light")
                                ? "<small>✓ Selected</small>"
                                : ""
                        }

                    </button>


                    <button
                        class="appearance-option
                        ${document.body.classList.contains("light")
                            ? "selected"
                            : ""}"
                        onclick="setTheme('light')">

                        <span>☀️</span>

                        <strong>Light</strong>

                        ${
                            document.body.classList.contains("light")
                                ? "<small>✓ Selected</small>"
                                : ""
                        }

                    </button>

                </div>

            </div>


            <!-- LEARNING METHOD -->

            <div class="settings-card learning-mode-card">

                <div class="settings-card-header">

                    <div>

                        <h3>📖 Learning Method</h3>

                        <p>
                            Select how OS TutorLLM should explain answers.
                        </p>

                    </div>

                </div>


                <div class="learning-mode-options">

                    <button
                        class="learning-mode-option
                        ${selectedMode === "short"
                            ? "selected"
                            : ""}"
                        onclick="setLearningMethod('short')">

                        <span class="learning-icon">⚡</span>

                        <div>

                            <strong>Short</strong>

                            <p>
                                Quick and concise explanations.
                            </p>

                        </div>

                        ${
                            selectedMode === "short"
                                ? "<b class='selected-label'>✓ Selected</b>"
                                : ""
                        }

                    </button>


                    <button
                        class="learning-mode-option
                        ${selectedMode === "detailed"
                            ? "selected"
                            : ""}"
                        onclick="setLearningMethod('detailed')">

                        <span class="learning-icon">📚</span>

                        <div>

                            <strong>Detailed</strong>

                            <p>
                                Complete explanations with examples.
                            </p>

                        </div>

                        ${
                            selectedMode === "detailed"
                                ? "<b class='selected-label'>✓ Selected</b>"
                                : ""
                        }

                    </button>


                    <button
                        class="learning-mode-option
                        ${selectedMode === "exam"
                            ? "selected"
                            : ""}"
                        onclick="setLearningMethod('exam')">

                        <span class="learning-icon">📝</span>

                        <div>

                            <strong>Exam Mode</strong>

                            <p>
                                Structured answers suitable for exams.
                            </p>

                        </div>

                        ${
                            selectedMode === "exam"
                                ? "<b class='selected-label'>✓ Selected</b>"
                                : ""
                        }

                    </button>

                </div>


                <div class="current-mode-box">

                    <strong>Current Learning Mode:</strong>

                    <span>
                        ${getModeLabel()}
                    </span>

                </div>

            </div>


            <!-- QUIZ PROGRESS -->

            <div class="settings-card">

                <div class="settings-card-header">

                    <div>

                        <h3>📊 Quiz Progress</h3>

                        <p>
                            Track your quiz performance.
                        </p>

                    </div>

                </div>


                <div class="progress-stats">

                    <div class="progress-stat">

                        <strong>
                            ${quizAttempts}
                        </strong>

                        <span>
                            Quiz Attempts
                        </span>

                    </div>


                    <div class="progress-stat">

                        <strong>
                            ${totalQuizCorrect}
                        </strong>

                        <span>
                            Correct Answers
                        </span>

                    </div>


                    <div class="progress-stat">

                        <strong>
                            ${progress}%
                        </strong>

                        <span>
                            Overall Progress
                        </span>

                    </div>

                </div>


                <div class="progress-bar-container">

                    <div
                        class="progress-bar"
                        style="width:${progress}%">
                    </div>

                </div>

            </div>


            <!-- QUIZ HISTORY -->

            <div class="settings-card">

                <div class="settings-card-header">

                    <div>

                        <h3>🏆 Quiz History</h3>

                        <p>
                            View your previous quiz attempts.
                        </p>

                    </div>

                </div>


                ${
                    quizHistory.length === 0

                    ?

                    `
                        <div class="empty-history">

                            <p>
                                No quiz attempts yet.
                            </p>

                            <small>
                                Complete a quiz to see your progress here.
                            </small>

                        </div>
                    `

                    :

                    `
                        <div class="quiz-history-list">

                            ${quizHistory
                                .slice(0, 10)
                                .map((quiz, index) => `

                                    <div class="quiz-history-item">

                                        <div>

                                            <strong>
                                                Quiz Attempt ${quizHistory.length - index}
                                            </strong>

                                            <small>
                                                ${quiz.date}
                                            </small>

                                        </div>

                                        <div class="quiz-history-score">

                                            ${quiz.score}/${quiz.total}

                                            <span>
                                                ${
                                                    Math.round(
                                                        (quiz.score /
                                                            quiz.total) * 100
                                                    )
                                                }%
                                            </span>

                                        </div>

                                    </div>

                                `)
                                .join("")}

                        </div>
                    `
                }


                ${
                    quizHistory.length > 0

                    ?

                    `
                        <button
                            class="clear-history-button"
                            onclick="clearQuizHistory()">

                            Clear Quiz History

                        </button>
                    `

                    : ""
                }

            </div>


            <!-- QUESTION HISTORY -->

            <div class="settings-card">

                <div class="settings-card-header">

                    <div>

                        <h3>🕘 Question History</h3>

                        <p>
                            Recently asked questions.
                        </p>

                    </div>

                </div>


                ${
                    history.length === 0

                    ?

                    `
                        <div class="empty-history">

                            <p>
                                No question history yet.
                            </p>

                        </div>
                    `

                    :

                    `
                        <div class="question-history-list">

                            ${history
                                .slice(0, 10)
                                .map(item => `

                                    <div class="history-item">

                                        <div>

                                            <strong>
                                                ${escapeHTML(item.question)}
                                            </strong>

                                            <small>
                                                ${item.time}
                                            </small>

                                        </div>

                                    </div>

                                `)
                                .join("")}

                        </div>
                    `
                }


                ${
                    history.length > 0

                    ?

                    `
                        <button
                            class="clear-history-button"
                            onclick="clearHistory()">

                            Clear Question History

                        </button>
                    `

                    : ""
                }

            </div>

        </div>

    `;

}


/* =========================================================
   17. THEME
   ========================================================= */

function setTheme(theme) {

    if (theme === "light") {

        document.body.classList.add("light");

        localStorage.setItem(
            "osTutorTheme",
            "light"
        );

    } else {

        document.body.classList.remove("light");

        localStorage.setItem(
            "osTutorTheme",
            "dark"
        );

    }


    showSettings();

}


/* =========================================================
   18. OLD THEME BUTTON SUPPORT
   ========================================================= */

function toggleTheme() {

    if (
        document.body.classList.contains("light")
    ) {

        setTheme("dark");

    } else {

        setTheme("light");

    }

}


/* =========================================================
   19. LOAD THEME
   ========================================================= */

function loadTheme() {

    const theme =
        localStorage.getItem("osTutorTheme");


    if (theme === "light") {

        document.body.classList.add("light");

    } else {

        document.body.classList.remove("light");

    }

}


/* =========================================================
   20. SET LEARNING METHOD
   ========================================================= */

function setLearningMethod(method) {

    localStorage.setItem(
        "osTutorLearningMethod",
        method
    );


    showSettings();

}


/* =========================================================
   21. CLEAR QUESTION HISTORY
   ========================================================= */

function clearHistory() {

    localStorage.removeItem(
        "osTutorHistory"
    );


    showSettings();

}


/* =========================================================
   22. CLEAR QUIZ HISTORY
   ========================================================= */

function clearQuizHistory() {

    localStorage.removeItem(
        "osTutorQuizHistory"
    );


    showSettings();

}


/* =========================================================
   23. QUIZ QUESTION BANK
   ========================================================= */

const quizQuestionBank = [

    {
        question: "Which scheduling algorithm is non-preemptive?",
        options: [
            "FCFS",
            "Round Robin",
            "SRTF",
            "Preemptive Priority"
        ],
        answer: 0
    },

    {
        question: "What does SRTF stand for?",
        options: [
            "Shortest Remaining Time First",
            "Shortest Running Task First",
            "System Response Time First",
            "Shortest Resource Task First"
        ],
        answer: 0
    },

    {
        question: "Which algorithm uses a time quantum?",
        options: [
            "FCFS",
            "SJF",
            "Round Robin",
            "FIFO"
        ],
        answer: 2
    },

    {
        question: "Which of the following is a necessary condition for deadlock?",
        options: [
            "Mutual Exclusion",
            "Compilation",
            "Paging",
            "Spooling"
        ],
        answer: 0
    },

    {
        question: "How many necessary conditions must hold simultaneously for deadlock?",
        options: [
            "2",
            "3",
            "4",
            "5"
        ],
        answer: 2
    },

    {
        question: "Which algorithm is used for deadlock avoidance?",
        options: [
            "Banker's Algorithm",
            "FCFS",
            "Round Robin",
            "FIFO"
        ],
        answer: 0
    },

    {
        question: "What is the formula for Need in Banker's Algorithm?",
        options: [
            "Need = Allocation + Maximum",
            "Need = Maximum - Allocation",
            "Need = Maximum + Available",
            "Need = Allocation - Available"
        ],
        answer: 1
    },

    {
        question: "What is a process?",
        options: [
            "A program in execution",
            "A file on disk",
            "A hardware device",
            "A compiler"
        ],
        answer: 0
    },

    {
        question: "Which structure stores information about a process?",
        options: [
            "PCB",
            "ALU",
            "Cache",
            "Stack only"
        ],
        answer: 0
    },

    {
        question: "What is the smallest unit of CPU execution?",
        options: [
            "Process",
            "Thread",
            "Program",
            "File"
        ],
        answer: 1
    },

    {
        question: "Which synchronization tool provides mutual exclusion?",
        options: [
            "Mutex",
            "Compiler",
            "Loader",
            "Scheduler"
        ],
        answer: 0
    },

    {
        question: "Which operation is commonly associated with semaphores?",
        options: [
            "wait and signal",
            "read and write",
            "open and close",
            "compile and run"
        ],
        answer: 0
    },

    {
        question: "Which memory management technique divides memory into pages and frames?",
        options: [
            "Paging",
            "Spooling",
            "Swapping only",
            "FCFS"
        ],
        answer: 0
    },

    {
        question: "What happens during a page fault?",
        options: [
            "Required page is not in physical memory",
            "CPU stops permanently",
            "Process is deleted",
            "Hard disk is formatted"
        ],
        answer: 0
    },

    {
        question: "Virtual memory allows:",
        options: [
            "Execution of programs larger than physical memory",
            "Only one process to run",
            "No memory allocation",
            "Removal of the CPU"
        ],
        answer: 0
    },

    {
        question: "Which condition means a process is holding resources while waiting for others?",
        options: [
            "Hold and Wait",
            "Mutual Exclusion",
            "Circular Buffer",
            "Paging"
        ],
        answer: 0
    },

    {
        question: "Which deadlock condition means a resource cannot be forcibly taken?",
        options: [
            "No Preemption",
            "Hold and Wait",
            "Circular Wait",
            "Mutual Exclusion"
        ],
        answer: 0
    },

    {
        question: "Which scheduling algorithm may cause starvation?",
        options: [
            "Priority Scheduling",
            "FCFS",
            "Round Robin",
            "FIFO"
        ],
        answer: 0
    },

    {
        question: "What technique can reduce starvation in priority scheduling?",
        options: [
            "Aging",
            "Paging",
            "Spooling",
            "Fragmentation"
        ],
        answer: 0
    },

    {
        question: "What is a critical section?",
        options: [
            "Part of a program accessing shared resources",
            "A memory page",
            "A disk partition",
            "A process state"
        ],
        answer: 0
    },

    {
        question: "Which is NOT a requirement of the critical-section problem?",
        options: [
            "Mutual Exclusion",
            "Progress",
            "Bounded Waiting",
            "Compilation"
        ],
        answer: 3
    },

    {
        question: "A race condition occurs when:",
        options: [
            "Execution result depends on timing/order",
            "CPU is switched off",
            "A file is deleted",
            "Memory is empty"
        ],
        answer: 0
    },

    {
        question: "Which directory structure has a root directory and hierarchical subdirectories?",
        options: [
            "Tree-structured",
            "Single-level",
            "Two-level",
            "Flat"
        ],
        answer: 0
    },

    {
        question: "Which scheduling algorithm is generally suitable for time-sharing systems?",
        options: [
            "Round Robin",
            "FCFS",
            "SJF",
            "Non-preemptive Priority"
        ],
        answer: 0
    },

    {
        question: "Turnaround Time is calculated as:",
        options: [
            "Completion Time - Arrival Time",
            "Burst Time - Arrival Time",
            "Waiting Time - Burst Time",
            "Arrival Time - Completion Time"
        ],
        answer: 0
    },

    {
        question: "Waiting Time is calculated as:",
        options: [
            "Turnaround Time - Burst Time",
            "Burst Time + Turnaround Time",
            "Arrival Time + Burst Time",
            "Completion Time + Burst Time"
        ],
        answer: 0
    },

    {
        question: "Which scheduling algorithm selects the process with the shortest burst time?",
        options: [
            "SJF",
            "FCFS",
            "Round Robin",
            "Priority"
        ],
        answer: 0
    },

    {
        question: "Which technique eliminates external fragmentation?",
        options: [
            "Paging",
            "FCFS",
            "Round Robin",
            "Deadlock detection"
        ],
        answer: 0
    },

    {
        question: "A semaphore used only for mutual exclusion can have values:",
        options: [
            "0 and 1",
            "1 and 2 only",
            "10 and 20",
            "Any negative value only"
        ],
        answer: 0
    },

    {
        question: "What does PCB stand for?",
        options: [
            "Process Control Block",
            "Program Control Buffer",
            "Process Communication Bus",
            "Program Counter Block"
        ],
        answer: 0
    }

];


/* =========================================================
   24. SHUFFLE ARRAY
   ========================================================= */

function shuffleArray(array) {

    const shuffled =
        [...array];


    for (
        let i = shuffled.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            shuffled[i],
            shuffled[j]
        ] =
        [
            shuffled[j],
            shuffled[i]
        ];

    }


    return shuffled;

}


/* =========================================================
   25. QUIZ VARIABLES
   ========================================================= */

let quizQuestions = [];

let currentQuizQuestion = 0;

let quizScore = 0;

let userQuizAnswers = [];

let quizSubmitted = false;


/* =========================================================
   26. SHOW QUIZ
   ========================================================= */

function showQuiz() {

    quizQuestions =
        shuffleArray(
            quizQuestionBank
        ).slice(0, 10);


    currentQuizQuestion = 0;

    quizScore = 0;

    userQuizAnswers =
        new Array(quizQuestions.length)
            .fill(null);

    quizSubmitted = false;


    renderQuiz();

}


/* =========================================================
   27. RENDER QUIZ
   ========================================================= */

function renderQuiz() {

    const section =
        document.querySelector(".chat-section");


    if (!section) {
        return;
    }


    const question =
        quizQuestions[currentQuizQuestion];


    const optionsHTML =
        question.options
            .map((option, index) => {

                const letter =
                    String.fromCharCode(
                        65 + index
                    );


                const selected =
                    userQuizAnswers[
                        currentQuizQuestion
                    ] === index;


                return `

                    <button
                        class="quiz-option
                        ${selected ? "selected" : ""}"
                        onclick="selectQuizAnswer(${index})">

                        <span class="quiz-option-letter">
                            ${letter}.
                        </span>

                        <span class="quiz-option-text">
                            ${escapeHTML(option)}
                        </span>

                    </button>

                `;

            })
            .join("");


    section.innerHTML = `

        <div class="quiz-container">

            <div class="quiz-header">

                <div>

                    <h2>🧠 Quiz Mode</h2>

                    <p>
                        Test your Operating Systems knowledge.
                    </p>

                </div>

                <div class="quiz-progress-text">

                    Question
                    ${currentQuizQuestion + 1}
                    of
                    ${quizQuestions.length}

                </div>

            </div>


            <div class="quiz-progress-bar">

                <div
                    class="quiz-progress-fill"
                    style="
                        width:
                        ${
                            ((currentQuizQuestion + 1)
                            / quizQuestions.length) * 100
                        }%;
                    ">
                </div>

            </div>


            <div class="quiz-question-card">

                <div class="question-number">

                    Question
                    ${currentQuizQuestion + 1}

                </div>


                <h3>
                    ${escapeHTML(question.question)}
                </h3>


                <div class="quiz-options">

                    ${optionsHTML}

                </div>


                <div class="quiz-navigation">

                    ${
                        currentQuizQuestion > 0

                        ?

                        `
                            <button
                                class="quiz-secondary-button"
                                onclick="previousQuizQuestion()">

                                ← Previous Question

                            </button>
                        `

                        :

                        `<div></div>`
                    }


                    ${
                        currentQuizQuestion <
                        quizQuestions.length - 1

                        ?

                        `
                            <button
                                class="quiz-next-button"
                                onclick="nextQuizQuestion()">

                                Next Question →

                            </button>
                        `

                        :

                        `
                            <button
                                class="quiz-submit-button"
                                onclick="submitQuiz()">

                                ✓ Submit Quiz

                            </button>
                        `
                    }

                </div>

            </div>

        </div>

    `;

}


/* =========================================================
   28. SELECT QUIZ ANSWER
   ========================================================= */

function selectQuizAnswer(index) {

    if (quizSubmitted) {
        return;
    }


    userQuizAnswers[
        currentQuizQuestion
    ] = index;


    renderQuiz();

}


/* =========================================================
   29. NEXT QUESTION
   ========================================================= */

function nextQuizQuestion() {

    if (
        userQuizAnswers[
            currentQuizQuestion
        ] === null
    ) {

        alert(
            "Please select an option before continuing."
        );

        return;
    }


    if (
        currentQuizQuestion <
        quizQuestions.length - 1
    ) {

        currentQuizQuestion++;

        renderQuiz();

    }

}


/* =========================================================
   30. PREVIOUS QUESTION
   ========================================================= */

function previousQuizQuestion() {

    if (currentQuizQuestion > 0) {

        currentQuizQuestion--;

        renderQuiz();

    }

}


/* =========================================================
   31. SUBMIT QUIZ
   ========================================================= */

function submitQuiz() {

    const unanswered =
        userQuizAnswers.filter(
            answer => answer === null
        ).length;


    if (unanswered > 0) {

        alert(
            `Please answer all questions before submitting.\n\n` +
            `${unanswered} question(s) are unanswered.`
        );

        return;
    }


    quizScore = 0;


    quizQuestions.forEach(
        (question, index) => {

            if (
                userQuizAnswers[index] ===
                question.answer
            ) {

                quizScore++;

            }

        }
    );


    quizSubmitted = true;


    saveQuizHistory();


    showQuizResult();

}


/* =========================================================
   32. SAVE QUIZ HISTORY
   ========================================================= */

function saveQuizHistory() {

    let history =
        JSON.parse(
            localStorage.getItem(
                "osTutorQuizHistory"
            ) || "[]"
        );


    history.unshift({

        score: quizScore,

        total: quizQuestions.length,

        date:
            new Date().toLocaleString()

    });


    history =
        history.slice(0, 20);


    localStorage.setItem(
        "osTutorQuizHistory",
        JSON.stringify(history)
    );

}


/* =========================================================
   33. SHOW QUIZ RESULT
   ========================================================= */

function showQuizResult() {

    const section =
        document.querySelector(".chat-section");


    if (!section) {
        return;
    }


    const percentage =
        Math.round(
            (quizScore /
                quizQuestions.length) * 100
        );


    let message = "";


    if (percentage >= 80) {

        message =
            "Excellent work! 🎉";

    } else if (percentage >= 60) {

        message =
            "Good job! Keep practicing. 👍";

    } else if (percentage >= 40) {

        message =
            "You are improving. Keep studying! 📚";

    } else {

        message =
            "Keep practicing and try again! 💪";

    }


    section.innerHTML = `

        <div class="quiz-result-container">

            <div class="quiz-result-card">

                <div class="result-icon">
                    🏆
                </div>

                <h2>
                    Quiz Completed!
                </h2>

                <p class="result-message">
                    ${message}
                </p>


                <div class="result-score">

                    <strong>
                        ${quizScore}/${quizQuestions.length}
                    </strong>

                    <span>
                        ${percentage}%
                    </span>

                </div>


                <div class="result-actions">

                    <button
                        class="quiz-submit-button"
                        onclick="showQuizAnswers()">

                        🔍 Check Answers

                    </button>


                    <button
                        class="quiz-secondary-button"
                        onclick="showQuiz()">

                        🔄 Try Again

                    </button>

                </div>

            </div>

        </div>

    `;

}


/* =========================================================
   34. SHOW QUIZ ANSWERS
   ========================================================= */

function showQuizAnswers() {

    const section =
        document.querySelector(".chat-section");


    if (!section) {
        return;
    }


    const questionsHTML =
        quizQuestions
            .map((question, index) => {

                const selectedIndex =
                    userQuizAnswers[index];


                const correctIndex =
                    question.answer;


                const selectedText =
                    question.options[
                        selectedIndex
                    ];


                const correctText =
                    question.options[
                        correctIndex
                    ];


                const isCorrect =
                    selectedIndex ===
                    correctIndex;


                const selectedLetter =
                    String.fromCharCode(
                        65 + selectedIndex
                    );


                const correctLetter =
                    String.fromCharCode(
                        65 + correctIndex
                    );


                return `

                    <div class="quiz-review-card">

                        <div class="review-question-number">

                            Question ${index + 1}

                            ${
                                isCorrect
                                    ? "✅"
                                    : "❌"
                            }

                        </div>


                        <h3>
                            ${escapeHTML(
                                question.question
                            )}
                        </h3>


                        <div class="review-answer
                            ${
                                isCorrect
                                    ? "correct"
                                    : "wrong"
                            }">

                            <strong>
                                Your Answer:
                            </strong>

                            <span>

                                ${selectedLetter}.
                                ${escapeHTML(
                                    selectedText
                                )}

                            </span>

                        </div>


                        ${
                            !isCorrect

                            ?

                            `
                                <div class="review-answer correct">

                                    <strong>
                                        Correct Answer:
                                    </strong>

                                    <span>

                                        ${correctLetter}.
                                        ${escapeHTML(
                                            correctText
                                        )}

                                    </span>

                                </div>
                            `

                            :

                            `
                                <div class="review-correct-message">

                                    ✓ Your answer is correct.

                                </div>
                            `
                        }

                    </div>

                `;

            })
            .join("");


    section.innerHTML = `

        <div class="quiz-review-container">

            <div class="quiz-review-header">

                <div>

                    <h2>
                        📋 Quiz Answer Review
                    </h2>

                    <p>
                        Your selected answers and the correct answers.
                    </p>

                </div>


                <div class="review-score">

                    Score:
                    <strong>
                        ${quizScore}/${quizQuestions.length}
                    </strong>

                </div>

            </div>


            ${questionsHTML}


            <div class="review-bottom-actions">

                <button
                    class="quiz-secondary-button"
                    onclick="showQuiz()">

                    🔄 Try Another Quiz

                </button>


                <button
                    class="quiz-submit-button"
                    onclick="showSettings()">

                    📊 View Progress

                </button>

            </div>

        </div>

    `;

}


/* =========================================================
   35. NAVIGATION
   ========================================================= */

function setupNavigation() {

    const navLinks =
        document.querySelectorAll(
            "nav a"
        );


    navLinks.forEach(
        (link, index) => {

            link.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();


                    navLinks.forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );


                    this.classList.add(
                        "active"
                    );


                    if (index === 0) {

                        showChat();

                    }


                    else if (index === 1) {

                        showTopics();

                    }


                    else if (index === 2) {

                        showQuiz();

                    }


                    else if (index === 3) {

                        showSettings();

                    }

                }
            );

        }
    );

}


/* =========================================================
   36. CHAT INPUT
   ========================================================= */

function setupChatInput() {

    const input =
        document.getElementById(
            "questionInput"
        );


    const button =
        document.getElementById(
            "askButton"
        );


    if (!input || !button) {
        return;
    }


    button.addEventListener(
        "click",
        function() {

            askQuestion(
                input.value
            );


            input.value = "";

            input.focus();

        }
    );


    input.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();


                askQuestion(
                    input.value
                );


                input.value = "";

            }

        }
    );

}


/* =========================================================
   37. LOAD PENDING QUESTION
   ========================================================= */

function loadPendingQuestion() {

    const question =
        sessionStorage.getItem(
            "osTutorPendingQuestion"
        );


    if (!question) {
        return;
    }


    sessionStorage.removeItem(
        "osTutorPendingQuestion"
    );


    setTimeout(
        function() {

            askQuestion(question);

        },
        500
    );

}


/* =========================================================
   38. THEME BUTTON IN HEADER
   ========================================================= */

function setupThemeButton() {

    const button =
        document.getElementById(
            "themeButton"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        function() {

            toggleTheme();

        }
    );

}


/* =========================================================
   39. INITIALIZE APPLICATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadTheme();

        setupNavigation();

        setupChatInput();

        setupThemeButton();

        loadPendingQuestion();

    }
);