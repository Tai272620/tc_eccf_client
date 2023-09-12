/* Higher Order Component */
/* Bảo vệ component không re-render nếu props không thay đổi */
import { Prop } from '@/pages/product/collections/Product';
import { memo } from 'react';

const Test = (data: Prop) => {
  const { count, handlePrintCount } = data;
  console.log("rerender test")
  return (
    <div>
      hello test {count}
      <button onClick={() => handlePrintCount(count)}>Test</button>
    </div>
  )
}

export default memo(Test);
