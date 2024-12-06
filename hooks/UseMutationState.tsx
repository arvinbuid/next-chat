import { useMutation } from 'convex/react';
import { useCallback, useState } from 'react';

export const useMutationState = (mutationToRun: any) => {
  const [pending, setPending] = useState(false);
  const mutationFn = useMutation(mutationToRun);

  const mutate = useCallback(
    (payload: any) => {
      setPending(true);

      return mutationFn(payload)
        .then((res) => res)
        .catch((error) => {
          throw error;
        })
        .finally(() => setPending(false));
    },
    [mutationFn],
  );

  return { pending, mutate };
};
