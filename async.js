//? Execute the following code in node to see example.
const wild = runWild();
runControlled();

function mockAsync(message, timeout) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(message), timeout);
  });
}

function runWild() {
  const first = mockAsync("I AM FIRST.... RIGHT??", 3000);
  console.log(first);
  const second = mockAsync("I AM SECOND", 999);
  console.log(second);
  const third = mockAsync("I AM THIRD", 900);
  console.log(third);
  const fourth = mockAsync("I AM FOURTH", 300);
  console.log(fourth);
  const fifth = mockAsync("I AM FIFTH", 400);
  console.log(fifth);

  //! Notice that these are all returning Promise Objects. We do not have access to the data yet. These console.logs() ran before the promise was resolved.

  //! We can resolve the promises one at a time, but this will not return the data in a predictable way. ***Check the terminal for the console.log()s***
  first.then(data => console.log(data));
  second.then(data => console.log(data));
  third.then(data => console.log(data));
  fourth.then(data => console.log(data));
  fifth.then(data => console.log(data));

  //! To resolve all of the Promises we could use a Promise.all(). It will wait for the data to be returned before trying to access it. But we will have to "nest" our code into a .then() and we do not get the data until all of the promises are resolved.
  //! Uncomment the Promise.all() to see one way we can retrieve the values
  return Promise.all([first, second, third, fourth, fifth]).then(data => {
    console.log(data);
  });
}

async function runControlled() {
  await wild;
  console.log("---------Start of the runControlled function---------");
  //! We can await any Promise, in this demo we do not want this function to run until after the wild() function finishes. (so what happens in the terminal is a little more obvious)

  const first = await mockAsync("Now I AM FIRST.... RIGHT??", 1000);
  console.log(first);
  const second = await mockAsync("Now I AM SECOND", 999);
  console.log(second);
  const third = await mockAsync("Now I AM THIRD", 900);
  console.log(third);
  const fourth = await mockAsync("Now I AM FOURTH", 300);
  console.log(fourth);
  const fifth = await mockAsync("Now I AM FIFTH", 400);
  console.log(fifth);

  //! Notice that all of these logs happen in order, and we have all of the data that is returned when the promise is resolved. That is because it waits for one line to finish completely before continuing to the next line. No need for a nested structure that a .then() would provide. async/await allows us to write code in a clear/concise and predictable way, without the need for nested functions.
}
