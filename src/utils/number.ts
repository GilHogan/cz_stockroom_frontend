/**
 * 随机获取数组中不重复的n个元素
 */
export const getRandomItemsFromArray = (arr: Array<any>, ranNum: number): Array<any> => {

  const result: any = [];
  const copyArr = Object.assign([], arr);
  for (let i = 0; i < ranNum; i++) {
    const ran = Math.floor(Math.random() * (copyArr.length - i));
    if (result.includes(copyArr[ran])) {
      continue;
    }
    result.push(copyArr[ran]);

    copyArr[ran] = copyArr[copyArr.length - i - 1];
  }

  return result;
}