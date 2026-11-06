import { DependencyList, useEffect, useMemo, useRef, useState } from "react";

export default function useExclusive<T extends (...args: any[]) => any>(
  callback: T,
  deps: DependencyList = []
) {
  const callbackRef = useRef<T>(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  const [isExclusive, setIsExclusive] = useState(false);
  const exclusiveFun: any = useMemo(() => {
    let isExclusiveFlag = isExclusive;
    const f = async (...args: any[]) => {
      if (!isExclusiveFlag) {
        isExclusiveFlag = true;
        setIsExclusive(true);
        const result = await callbackRef.current(...args);
        setIsExclusive(false);
        return result;
      }
    };
    f.isExclusive = isExclusive;
    return f;
  }, [...deps, isExclusive, setIsExclusive]); // eslint-disable-line react-hooks/exhaustive-deps
  return exclusiveFun as T & { readonly isExclusive: boolean };
}
