# use-exclusive

```js
const onClick = useExclusive(async () => {
  console.log('useExclusive start');
  await delay(1000);
  console.log('useExclusive end');
});
```
