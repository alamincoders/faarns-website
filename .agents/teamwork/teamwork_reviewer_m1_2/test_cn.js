const { clsx } = require('clsx');
const { twMerge } = require('tailwind-merge');

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const tests = [
  {
    name: "empty call",
    run: () => cn(),
    expected: ""
  },
  {
    name: "empty strings and falsy values",
    run: () => cn("", undefined, null, false),
    expected: ""
  },
  {
    name: "conflicting padding classes",
    run: () => cn("px-2 py-1", "px-4"),
    expected: "py-1 px-4"
  },
  {
    name: "conflicting text colors",
    run: () => cn("text-red-500", "text-blue-500"),
    expected: "text-blue-500"
  },
  {
    name: "nested arrays with booleans and nulls",
    run: () => cn(["btn", ["btn-primary", false, null, "active"]]),
    expected: "btn btn-primary active"
  },
  {
    name: "object conditionals",
    run: () => cn({ "bg-black": true, "text-white": false, "rounded-lg": true }),
    expected: "bg-black rounded-lg"
  },
  {
    name: "arbitrary values override",
    run: () => cn("p-[10px]", "p-[20px]"),
    expected: "p-[20px]"
  },
  {
    name: "grid cols override",
    run: () => cn("grid grid-cols-2", "grid-cols-4"),
    expected: "grid grid-cols-4"
  },
  {
    name: "legacy custom classes alongside tailwind",
    run: () => cn("flow-top status", "status-done"),
    expected: "flow-top status status-done"
  }
];

let failed = 0;
for (const t of tests) {
  const result = t.run();
  if (result === t.expected) {
    console.log(`PASS: ${t.name} => "${result}"`);
  } else {
    console.error(`FAIL: ${t.name}: expected "${t.expected}", got "${result}"`);
    failed++;
  }
}

if (failed === 0) {
  console.log("ALL cn() EDGE CASE TESTS PASSED!");
} else {
  console.error(`${failed} tests failed.`);
  process.exit(1);
}
