import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";

// able to render in any framework -> React, Vue, etc.
export default () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  });

  return <div ref={ref} />;
};
