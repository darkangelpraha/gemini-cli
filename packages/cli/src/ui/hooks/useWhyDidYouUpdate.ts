/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useWhyDidYouUpdate(name: string, props: Record<string, any>) {
  const previousProps = useRef<Record<string, unknown>>({});

  useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      const changedKeys: string[] = [];

      allKeys.forEach((key) => {
        if (
          previousProps.current &&
          previousProps.current[key] !== props[key]
        ) {
          changedKeys.push(key);
        }
      });

      if (changedKeys.length) {
        console.debug(
          '[why-did-you-update]',
          name,
          'Changed props:',
          changedKeys,
        );
      } else {
        console.debug('[why-did-you-update]', name, 'No changes');
      }
    }

    previousProps.current = props;
  });
}
