function switchLightsBruteforce(entranceTimes, exitTimes) {
    let switchCount = 0;
    for (let i = 0; i < entranceTimes.length; i++) {
        let switchOff = true;
        for (let j = 0; j < i; j++) {
            if (exitTimes[j] > entranceTimes[i]) {
                switchOff = false;
                break;
            }
        }
        if (switchOff) {
            switchCount++;
        }
    }
    return switchCount;
}

// // Example usage
// const entranceTimes = [1,3, 3, 6, 10];
// const exitTimes = [2,5, 9, 9, 15];
// console.log(switchLightsBruteforce(entranceTimes, exitTimes)); // Output: 3



function switchLightsBetter(entranceTimes, exitTimes) {
    let switchCount = 0;
    let stack = [];
    for (let i = 0; i < entranceTimes.length; i++) {
        while (stack.length && stack[stack.length - 1] < entranceTimes[i]) {
            stack.pop();
        }
        if (!stack.length) {
            switchCount++;
        }
        stack.push(exitTimes[i]);
    }
    return switchCount;
}

const entranceTimes = [1,3, 3, 6, 10];
const exitTimes = [2,5, 9, 9, 15];
console.log(switchLightsBetter(entranceTimes, exitTimes)); // Output: 3